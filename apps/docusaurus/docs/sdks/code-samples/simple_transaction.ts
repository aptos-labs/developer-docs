/**
 * This example shows how to use the Aptos SDK to send a transaction.
 */

import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

async function example() {
  console.log(
    "This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account.",
  );

  // 0. Setup the client and test accounts
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  let alice = Account.generate();
  let bob = Account.generate();

  console.log("=== Addresses ===\n");
  console.log(`Alice's address is: ${alice.accountAddress}`);
  console.log(`Bob's address is: ${bob.accountAddress}`);

  console.log("\n=== Funding accounts ===\n");
  await aptos.fundAccount({
    accountAddress: alice.accountAddress,
    amount: 100_000_000,
  });
  await aptos.fundAccount({
    accountAddress: bob.accountAddress,
    amount: 100,
  });
  console.log("Funded Alice and Bob's accounts!");

  // 1. Build
  console.log("\n=== 1. Building the transaction ===\n");
  const transaction = await aptos.transaction.build.simple({
    sender: alice.accountAddress,
    data: {
      // All transactions on Aptos are implemented via smart contracts.
      function: "0x1::aptos_account::transfer",
      functionArguments: [bob.accountAddress, 100],
    },
  });
  console.log("Built the transaction!");

  // 2. Simulate (Optional)
  console.log("\n === 2. Simulating Response (Optional) === \n");
  const [userTransactionResponse] = await aptos.transaction.simulate.simple({
    signerPublicKey: alice.publicKey,
    transaction,
  });
  console.log(userTransactionResponse);

  // 3. Sign
  console.log("\n=== 3. Signing transaction ===\n");
  const senderAuthenticator = aptos.transaction.sign({
    signer: alice,
    transaction,
  });
  console.log("Signed the transaction!");

  // 4. Submit
  console.log("\n=== 4. Submitting transaction ===\n");
  const submittedTransaction = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  console.log(`Submitted transaction hash: ${submittedTransaction.hash}`);

  // 5. Wait for results
  console.log("\n=== 5. Waiting for result of transaction ===\n");
  const executedTransaction = await aptos.waitForTransaction({
    transactionHash: submittedTransaction.hash,
  });
  console.log(executedTransaction);
}

example();
