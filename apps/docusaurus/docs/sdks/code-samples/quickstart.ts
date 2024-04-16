/**
 * This example shows how to use the Aptos client to create accounts, fund them, and transfer between them.
 */

import {
  Account,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
const ALICE_INITIAL_BALANCE = 100_000_000;
const BOB_INITIAL_BALANCE = 100;
const TRANSFER_AMOUNT = 100;

async function example() {
  console.log("This example will create two accounts (Alice and Bob), fund them, and transfer between them.");

  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  // Generate two account credentials
  // Each account has a private key, a public key, and an address
  const alice = Account.generate();
  const bob = Account.generate();

  console.log("=== Addresses ===\n");
  console.log(`Alice's address is: ${alice.accountAddress}`);
  console.log(`Bob's address is: ${bob.accountAddress}`);

  // Fund the accounts using a faucet
  console.log("\n=== Funding accounts ===\n");

  await aptos.fundAccount({
    accountAddress: alice.accountAddress,
    amount: ALICE_INITIAL_BALANCE,
  });

  await aptos.fundAccount({
    accountAddress: bob.accountAddress,
    amount: BOB_INITIAL_BALANCE,
  });
  console.log("Alice and Bob's accounts have been funded!")

  // Look up the newly funded account's balances
  console.log("\n=== Balances ===\n");
  const aliceAccountBalance = await aptos.getAccountResource({ accountAddress: alice.accountAddress, resourceType: COIN_STORE });
  const aliceBalance = Number(aliceAccountBalance.coin.value);
  console.log(`Alice's balance is: ${aliceBalance}`);

  const bobAccountBalance = await aptos.getAccountResource({ accountAddress: bob.accountAddress, resourceType: COIN_STORE });
  const bobBalance = Number(bobAccountBalance.coin.value);
  console.log(`Bob's balance is: ${bobBalance}`);

  // Send a transaction from Alice's account to Bob's account
  const txn = await aptos.transaction.build.simple({
    sender: alice.accountAddress,
    data: {
      // All transactions on Aptos are implemented via smart contracts.
      function: "0x1::aptos_account::transfer",
      functionArguments: [bob.accountAddress, 100],
    },
  });

  console.log("\n=== Transfer transaction ===\n");
  // Both signs and submits
  const committedTxn = await aptos.signAndSubmitTransaction({ signer: alice, transaction: txn });
  // Waits for Aptos to verify and execute the transaction
  const executedTransaction = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
  console.log("Transaction hash:", executedTransaction.hash)

  console.log("\n=== Balances after transfer ===\n");
  const newAliceAccountBalance = await aptos.getAccountResource({ accountAddress: alice.accountAddress, resourceType: COIN_STORE });
  const newAliceBalance = Number(newAliceAccountBalance.coin.value);
  console.log(`Alice's balance is: ${newAliceBalance}`);

  const newBobAccountBalance = await aptos.getAccountResource({ accountAddress: bob.accountAddress, resourceType: COIN_STORE });
  const newBobBalance = Number(newBobAccountBalance.coin.value);
  console.log(`Bob's balance is: ${newBobBalance}`);

  // Bob should have the transfer amount
  if (newBobBalance !== TRANSFER_AMOUNT + BOB_INITIAL_BALANCE)
    throw new Error("Bob's balance after transfer is incorrect");

  // Alice should have the remainder minus gas
  if (newAliceBalance >= ALICE_INITIAL_BALANCE - TRANSFER_AMOUNT)
    throw new Error("Alice's balance after transfer is incorrect");
};

example();