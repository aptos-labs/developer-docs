script {
  use std::signer;
  use aptos_framework::coin;
  use aptos_framework::aptos_account;

  fun transfer_half<Coin>(caller: &signer, receiver_address: address) {
    // Retrieve the balance of the caller
    let caller_address: address = signer::address_of(caller);
    let balance: u64 = coin::balance<Coin>(caller_address);

    // Send half to the receiver
    let half = balance / 2;
    aptos_account::transfer_coins<Coin>(caller, receiver_address, half);
  }
}
