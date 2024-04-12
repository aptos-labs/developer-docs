/**
 * This example shows how to use the Aptos SDK to send a transaction.
 */

const {
    Account,
    Aptos,
    AptosConfig,
    parseTypeTag,
    Network,
} = require("@aptos-labs/ts-sdk");

const example = async () => {
    console.log("This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account.");

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
    console.log("Done funding accounts.")

    // 1. Build
    console.log("\n=== 1. Building the transaction ===\n");
    const transaction = await aptos.transaction.build.simple({
        sender: alice.accountAddress,
        data: {
        // All transactions on Aptos are implemented via smart contracts.
        function: "0x1::coin::transfer",
        typeArguments: [parseTypeTag("0x1::aptos_coin::AptosCoin")],
        functionArguments: [bob.accountAddress, 100],
        },
    });
    console.log("Transaction:", transaction)

    // 2. Simulate (Optional)
    const [userTransactionResponse] = await aptos.transaction.simulate.simple({
        signerPublicKey: alice.publicKey,
        transaction,
    });
    console.log("\n === 2. Simulated Response === \n")
    console.log(userTransactionResponse)

    // 3. Sign
    const senderAuthenticator = aptos.transaction.sign({
        signer: alice,
        transaction,
    });
    console.log("\n=== 3. Signed transaction ===\n");
    console.log(senderAuthenticator)

    // 4. Submit
    const committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator,
    });

    console.log("\n=== 4. Submitted transaction hash ===\n");
    console.log(`Committed transaction: ${committedTransaction.hash}`);

    // 5. Wait for results
    const result = await aptos.waitForTransaction({ transactionHash: committedTransaction.hash });

    console.log("\n=== 5. Result of transaction ===\n");
    console.log(result)
};

example();