/**
 * This example shows how to use the Aptos SDK to send a transaction.
 */

const {
    Account,
    Aptos,
    AptosConfig,
    Network,
} = require("@aptos-labs/ts-sdk");

const example = async () => {
    console.log("This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account.");

    // 0. Setup the client and test accounts
    const config = new AptosConfig({ network: Network.DEVNET });
    const aptos = new Aptos(config);

    let alice = Account.generate();
    let bob = Account.generate();
    let carol = Account.generate();

    console.log("=== Addresses ===\n");
    console.log(`Alice's address is: ${alice.accountAddress}`);
    console.log(`Bob's address is: ${bob.accountAddress}`);
    console.log(`Carol's address is: ${carol.accountAddress}`);

    console.log("\n=== Funding accounts ===\n");
    await aptos.fundAccount({
        accountAddress: alice.accountAddress,
        amount: 100_000_000,
    });  
    await aptos.fundAccount({
        accountAddress: bob.accountAddress,
        amount: 100_000_000,
    });
    await aptos.fundAccount({
        accountAddress: carol.accountAddress,
        amount: 100_000_000,
    });
    console.log("Done funding Alice, Bob, and Carol's accounts.")

    // 1. Build
    console.log("\n=== 1. Building the transaction ===\n");
    const transaction = await aptos.transaction.build.multiAgent({
        sender: alice.accountAddress,
        secondarySignerAddresses: [bob.accountAddress],
        data: {
            // REPLACE WITH YOUR MULTI-AGENT FUNCTION HERE
            function: "<REPLACE WITH YOUR MULTI AGENT MOVE ENTRY FUNCTION>",
            functionArguments: [],
        },
    });
    console.log("Transaction:", transaction)

    // 2. Simulate (Optional)
    console.log("\n === 2. Simulating Response (Optional) === \n")
    const [userTransactionResponse] = await aptos.transaction.simulate.multiAgent({
        signerPublicKey: alice.publicKey,
        secondarySignersPublicKeys: [bob.publicKey],
        transaction,
    });
    console.log(userTransactionResponse)

    // 3. Sign
    console.log("\n=== 3. Signing transaction ===\n");
    const aliceSenderAuthenticator = aptos.transaction.sign({
        signer: alice,
        transaction,
    });
    const bobSenderAuthenticator = aptos.transaction.sign({
        signer: bob,
        transaction
    })
    console.log(aliceSenderAuthenticator)
    console.log(bobSenderAuthenticator)

    // 4. Submit
    console.log("\n=== 4. Submitting transaction ===\n");
    const committedTransaction = await aptos.transaction.submit.multiAgent({
        transaction,
        senderAuthenticator: aliceSenderAuthenticator,
        additionalSignersAuthenticators: [bobSenderAuthenticator],
    });
    console.log("Submitted transaction hash:", committedTransaction.hash);

    // 5. Wait for results
    console.log("\n=== 5. Waiting for result of transaction ===\n");
    const executedTransaction = await aptos.waitForTransaction({ transactionHash: committedTransaction.hash });
    console.log(executedTransaction)
};

example();