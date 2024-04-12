/**
 * This example shows how to use the Aptos client to create accounts, fund them, and transfer between them.
 */

const {
    Account,
    Aptos,
    AptosConfig,
    parseTypeTag,
    NetworkToNetworkName,
    Network,
    AccountAddress,
    U64,
  } = require("@aptos-labs/ts-sdk");
  
  const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
  const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
  const ALICE_INITIAL_BALANCE = 100_000_000;
  const BOB_INITIAL_BALANCE = 100;
  const TRANSFER_AMOUNT = 100;
  
  /**
   * Prints the balance of an account
   * @param aptos
   * @param name
   * @param address
   * @returns {Promise<*>}
   *
   */
  const balance = async (client, name, address) => {
    let balance = await client.getAccountResource({ accountAddress: address, resourceType: COIN_STORE });
  
    let amount = Number(balance.coin.value);
  
    console.log(`${name}'s balance is: ${amount}`);
    return amount;
  };
  
  const example = async () => {
    console.log("This example will create two accounts (Alice and Bob), fund them, and transfer between them.");
  
    // Setup the client
    const config = new AptosConfig({ network: Network.TESTNET });
    const client = new Aptos(config);
  
    // Generate two account credentials
    // Each account has a private key, a public key, and an address
    let alice = Account.generate();
    let bob = Account.generate();
  
    console.log("=== Addresses ===\n");
    console.log(`Alice's address is: ${alice.accountAddress}`);
    console.log(`Bob's address is: ${bob.accountAddress}`);
  
    // Fund the accounts using a faucet
    console.log("\n=== Funding accounts ===\n");
  
    const aliceFundTxn = await client.fundAccount({
      accountAddress: alice.accountAddress,
      amount: ALICE_INITIAL_BALANCE,
    });
    console.log("Alice's fund transaction: ", aliceFundTxn);
  
    const bobFundTxn = await client.fundAccount({
      accountAddress: bob.accountAddress,
      amount: BOB_INITIAL_BALANCE,
    });
    console.log("Bob's fund transaction: ", bobFundTxn);
  
    // Look up the newly funded account's balances
    console.log("\n=== Balances ===\n");
    let aliceAccountBalance = await client.getAccountResource({ accountAddress: alice.accountAddress, resourceType: COIN_STORE });
    let aliceBalance = Number(aliceAccountBalance.coin.value);
    console.log(`Alice's balance is: ${aliceBalance}`);

    let bobAccountBalance = await client.getAccountResource({ accountAddress: bob.accountAddress, resourceType: COIN_STORE });
    let bobBalance = Number(bobAccountBalance.coin.value);
    console.log(`Bob's balance is: ${bobBalance}`);
  
    // Send a transaction from Alice's account to Bob's account
    const txn = await client.transaction.build.simple({
      sender: alice.accountAddress,
      data: {
        // All transactions on Aptos are implemented via smart contracts.
        function: "0x1::coin::transfer",
        typeArguments: [parseTypeTag("0x1::aptos_coin::AptosCoin")],
        functionArguments: [AccountAddress.from(bob.accountAddress), new U64(100)],
      },
    });
  
    console.log("\n=== Transfer transaction ===\n");
    let committedTxn = await client.signAndSubmitTransaction({ signer: alice, transaction: txn });
    console.log(`Committed transaction: ${committedTxn.hash}`);
    await client.waitForTransaction({ transactionHash: committedTxn.hash });
  
    console.log("\n=== Balances after transfer ===\n");
    let newAliceBalance = await balance(client, "Alice", alice.accountAddress);
    let newBobBalance = await balance(client, "Bob", bob.accountAddress);
  
    // Bob should have the transfer amount
    if (newBobBalance !== TRANSFER_AMOUNT + BOB_INITIAL_BALANCE)
      throw new Error("Bob's balance after transfer is incorrect");
  
    // Alice should have the remainder minus gas
    if (newAliceBalance >= ALICE_INITIAL_BALANCE - TRANSFER_AMOUNT)
      throw new Error("Alice's balance after transfer is incorrect");
  };
  
  example();