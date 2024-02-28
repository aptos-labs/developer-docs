// Copyright © Aptos Foundation
// Parts of the project are originally copyright © Meta Platforms, Inc.
// SPDX-License-Identifier: Apache-2.0

use crate::{
    crypto::{
        ed25519::{Ed25519PrivateKey, Ed25519PublicKey},
        signing_message,
        traits::Uniform,
    },
    transaction_builder::TransactionBuilder,
    types::{
        account_address::AccountAddress,
        transaction::{authenticator::AuthenticationKey, RawTransaction, SignedTransaction},
    },
};
use anyhow::Result;
use aptos_crypto::ed25519::Ed25519Signature;
use aptos_ledger::AptosLedgerError;
use aptos_types::event::EventKey;
pub use aptos_types::*;
use bip39::{Language, Mnemonic, Seed};
use ed25519_dalek_bip32::{DerivationPath, ExtendedSecretKey};
use std::{
    str::FromStr,
    sync::atomic::{AtomicU64, Ordering},
    time::{Duration, SystemTime, UNIX_EPOCH},
};

/// LocalAccount represents an account on the Aptos blockchain. Internally it
/// holds the private / public key pair and the address of the account. You can
/// use this struct to help transact with the blockchain, e.g. by generating a
/// new account and signing transactions.
#[derive(Debug)]
pub struct LocalAccount {
    /// Address of the account.
    address: AccountAddress,
    /// Authentication key of the account.
    key: AccountKey,
    /// Latest known sequence number of the account, it can be different from validator.
    sequence_number: AtomicU64,
}

impl LocalAccount {
    /// Create a new representation of an account locally. Note: This function
    /// does not actually create an account on the Aptos blockchain, just a
    /// local representation.
    pub fn new<T: Into<AccountKey>>(address: AccountAddress, key: T, sequence_number: u64) -> Self {
        Self {
            address,
            key: key.into(),
            sequence_number: AtomicU64::new(sequence_number),
        }
    }

    /// Recover an account from derive path (e.g. m/44'/637'/0'/0'/0') and mnemonic phrase,
    pub fn from_derive_path(
        derive_path: &str,
        mnemonic_phrase: &str,
        sequence_number: u64,
    ) -> Result<Self> {
        let derive_path = DerivationPath::from_str(derive_path)?;
        let mnemonic = Mnemonic::from_phrase(mnemonic_phrase, Language::English)?;
        // TODO: Make `password` as an optional argument.
        let seed = Seed::new(&mnemonic, "");
        let key = ExtendedSecretKey::from_seed(seed.as_bytes())?
            .derive(&derive_path)?
            .secret_key;
        let key = AccountKey::from(Ed25519PrivateKey::try_from(key.as_bytes().as_ref())?);
        let address = key.authentication_key().account_address();

        Ok(Self {
            address,
            key,
            sequence_number: AtomicU64::new(sequence_number),
        })
    }

    /// Generate a new account locally. Note: This function does not actually
    /// create an account on the Aptos blockchain, it just generates a new
    /// account locally.
    pub fn generate<R>(rng: &mut R) -> Self
    where
        R: ::rand_core::RngCore + ::rand_core::CryptoRng,
    {
        let key = AccountKey::generate(rng);
        let address = key.authentication_key().account_address();

        Self::new(address, key, 0)
    }

    pub fn sign_transaction(&self, txn: RawTransaction) -> SignedTransaction {
        txn.sign(self.private_key(), self.public_key().clone())
            .expect("Signing a txn can't fail")
            .into_inner()
    }

    pub fn sign_with_transaction_builder(&self, builder: TransactionBuilder) -> SignedTransaction {
        let raw_txn = builder
            .sender(self.address())
            .sequence_number(self.increment_sequence_number())
            .build();
        self.sign_transaction(raw_txn)
    }

    pub fn sign_multi_agent_with_transaction_builder(
        &self,
        secondary_signers: Vec<&Self>,
        builder: TransactionBuilder,
    ) -> SignedTransaction {
        let secondary_signer_addresses = secondary_signers
            .iter()
            .map(|signer| signer.address())
            .collect();
        let secondary_signer_privkeys = secondary_signers
            .iter()
            .map(|signer| signer.private_key())
            .collect();
        let raw_txn = builder
            .sender(self.address())
            .sequence_number(self.increment_sequence_number())
            .build();
        raw_txn
            .sign_multi_agent(
                self.private_key(),
                secondary_signer_addresses,
                secondary_signer_privkeys,
            )
            .expect("Signing multi agent txn failed")
            .into_inner()
    }

    pub fn sign_fee_payer_with_transaction_builder(
        &self,
        secondary_signers: Vec<&Self>,
        fee_payer_signer: &Self,
        builder: TransactionBuilder,
    ) -> SignedTransaction {
        let secondary_signer_addresses = secondary_signers
            .iter()
            .map(|signer| signer.address())
            .collect();
        let secondary_signer_privkeys = secondary_signers
            .iter()
            .map(|signer| signer.private_key())
            .collect();
        let raw_txn = builder
            .sender(self.address())
            .sequence_number(self.increment_sequence_number())
            .build();
        raw_txn
            .sign_fee_payer(
                self.private_key(),
                secondary_signer_addresses,
                secondary_signer_privkeys,
                fee_payer_signer.address(),
                fee_payer_signer.private_key(),
            )
            .expect("Signing multi agent txn failed")
            .into_inner()
    }

    pub fn address(&self) -> AccountAddress {
        self.address
    }

    pub fn private_key(&self) -> &Ed25519PrivateKey {
        self.key.private_key()
    }

    pub fn public_key(&self) -> &Ed25519PublicKey {
        self.key.public_key()
    }

    pub fn authentication_key(&self) -> AuthenticationKey {
        self.key.authentication_key()
    }

    pub fn sequence_number(&self) -> u64 {
        self.sequence_number.load(Ordering::SeqCst)
    }

    pub fn increment_sequence_number(&self) -> u64 {
        self.sequence_number.fetch_add(1, Ordering::SeqCst)
    }

    pub fn decrement_sequence_number(&self) -> u64 {
        self.sequence_number.fetch_sub(1, Ordering::SeqCst)
    }

    pub fn set_sequence_number(&self, sequence_number: u64) {
        self.sequence_number
            .store(sequence_number, Ordering::SeqCst);
    }

    pub fn rotate_key<T: Into<AccountKey>>(&mut self, new_key: T) -> AccountKey {
        std::mem::replace(&mut self.key, new_key.into())
    }

    pub fn received_event_key(&self) -> EventKey {
        EventKey::new(2, self.address)
    }

    pub fn sent_event_key(&self) -> EventKey {
        EventKey::new(3, self.address)
    }
}

/// Types of hardware wallet the SDK currently supports
#[derive(Debug)]
pub enum HardwareWalletType {
    Ledger,
}

pub trait TransactionSigner {
    fn sign_transaction(&self, txn: RawTransaction) -> Result<SignedTransaction>;

    fn sign_with_transaction_builder(
        &mut self,
        builder: TransactionBuilder,
    ) -> Result<SignedTransaction>;
}

/// Similar to LocalAccount, but for hardware wallets.
/// HardwareWallet does not have private key exported.
/// Anything that requires private key should be go through HardwareWallet.
#[derive(Debug)]
pub struct HardwareWalletAccount {
    address: AccountAddress,
    public_key: Ed25519PublicKey,
    derivation_path: String,
    hardware_wallet_type: HardwareWalletType,
    /// Same as LocalAccount's sequence_number.
    sequence_number: u64,
}

impl TransactionSigner for HardwareWalletAccount {
    fn sign_transaction(&self, txn: RawTransaction) -> Result<SignedTransaction> {
        let signature = self.sign_arbitrary_message(
            signing_message(&txn)
                .expect("Unable to convert txn to signing message.")
                .as_ref(),
        )?;
        Ok(SignedTransaction::new(
            txn,
            self.public_key().clone(),
            signature,
        ))
    }

    fn sign_with_transaction_builder(
        &mut self,
        builder: TransactionBuilder,
    ) -> Result<SignedTransaction> {
        let two_minutes = Duration::from_secs(2 * 60);
        let current_time = SystemTime::now().duration_since(UNIX_EPOCH)? + two_minutes;
        let seconds = current_time.as_secs();

        let raw_txn = builder
            .sender(self.address())
            .sequence_number(self.sequence_number())
            .expiration_timestamp_secs(seconds)
            .build();
        *self.sequence_number_mut() += 1;
        self.sign_transaction(raw_txn)
    }
}

impl HardwareWalletAccount {
    pub fn new(
        address: AccountAddress,
        public_key: Ed25519PublicKey,
        derivation_path: String,
        hardware_wallet_type: HardwareWalletType,
        sequence_number: u64,
    ) -> Self {
        Self {
            address,
            public_key,
            derivation_path,
            hardware_wallet_type,
            sequence_number,
        }
    }

    /// Create a new account from a Ledger device.
    /// This requires the Ledger device to be connected, unlocked and the Aptos app to be opened
    pub fn from_ledger(
        derivation_path: String,
        sequence_number: u64,
    ) -> Result<Self, AptosLedgerError> {
        let public_key = aptos_ledger::get_public_key(&derivation_path, false)?;
        let authentication_key = AuthenticationKey::ed25519(&public_key);
        let address = authentication_key.account_address();

        Ok(Self::new(
            address,
            public_key,
            derivation_path,
            HardwareWalletType::Ledger,
            sequence_number,
        ))
    }

    pub fn address(&self) -> AccountAddress {
        self.address
    }

    pub fn public_key(&self) -> &Ed25519PublicKey {
        &self.public_key
    }

    pub fn derivation_path(&self) -> &str {
        &self.derivation_path
    }

    pub fn hardware_wallet_type(&self) -> &HardwareWalletType {
        &self.hardware_wallet_type
    }

    pub fn sequence_number(&self) -> u64 {
        self.sequence_number
    }

    pub fn sequence_number_mut(&mut self) -> &mut u64 {
        &mut self.sequence_number
    }

    pub fn sign_arbitrary_message(
        &self,
        message: &[u8],
    ) -> Result<Ed25519Signature, AptosLedgerError> {
        aptos_ledger::sign_message(&self.derivation_path, message)
    }
}

#[derive(Debug)]
pub struct AccountKey {
    private_key: Ed25519PrivateKey,
    public_key: Ed25519PublicKey,
    authentication_key: AuthenticationKey,
}

impl AccountKey {
    pub fn generate<R>(rng: &mut R) -> Self
    where
        R: ::rand_core::RngCore + ::rand_core::CryptoRng,
    {
        let private_key = Ed25519PrivateKey::generate(rng);
        Self::from_private_key(private_key)
    }

    pub fn from_private_key(private_key: Ed25519PrivateKey) -> Self {
        let public_key = Ed25519PublicKey::from(&private_key);
        let authentication_key = AuthenticationKey::ed25519(&public_key);

        Self {
            private_key,
            public_key,
            authentication_key,
        }
    }

    pub fn private_key(&self) -> &Ed25519PrivateKey {
        &self.private_key
    }

    pub fn public_key(&self) -> &Ed25519PublicKey {
        &self.public_key
    }

    pub fn authentication_key(&self) -> AuthenticationKey {
        self.authentication_key
    }
}

impl From<Ed25519PrivateKey> for AccountKey {
    fn from(private_key: Ed25519PrivateKey) -> Self {
        Self::from_private_key(private_key)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_recover_account_from_derive_path() {
        // Same constants in test cases of TypeScript
        // https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/aptos_account.test.ts
        let derive_path = "m/44'/637'/0'/0'/0'";
        let mnemonic_phrase =
            "shoot island position soft burden budget tooth cruel issue economy destroy above";
        let expected_address = "0x7968dab936c1bad187c60ce4082f307d030d780e91e694ae03aef16aba73f30";

        // Validate if the expected address.
        let account = LocalAccount::from_derive_path(derive_path, mnemonic_phrase, 0).unwrap();
        assert_eq!(account.address().to_hex_literal(), expected_address);

        // Return an error for empty derive path.
        assert!(LocalAccount::from_derive_path("", mnemonic_phrase, 0).is_err());

        // Return an error for empty mnemonic phrase.
        assert!(LocalAccount::from_derive_path(derive_path, "", 0).is_err());
    }
}
