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
    console.log("This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Carol's account.");

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
        amount: 500_000_000_000_000,
    });  
    await aptos.fundAccount({
        accountAddress: bob.accountAddress,
        amount: 500_000_000_000_000,
    });
    await aptos.fundAccount({
        accountAddress: carol.accountAddress,
        amount: 100,
    });
    console.log("Done funding accounts.")

    // 1. Build
    console.log("\n=== 1. Building the transaction ===\n");
    const transaction = await aptos.transaction.build.simple({
        sender: alice.accountAddress,
        withFeePayer: true,
        data: {
            // All transactions on Aptos are implemented via smart contracts.
            function: "0x1::coin::transfer",
            typeArguments: [parseTypeTag("0x1::aptos_coin::AptosCoin")],
            functionArguments: [carol.accountAddress, 100],
        },
    });
    console.log("Transaction:", transaction)

    // 2. Simulate (Optional)
    console.log("\n === 2. Simulating Response (Optional) === \n")
    const [userTransactionResponse] = await aptos.transaction.simulate.simple({
        signerPublicKey: alice.publicKey,
        feePayerPublicKey: bob.publicKey,
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
    const committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator: aliceSenderAuthenticator,
        feePayerAuthenticator: bobSenderAuthenticator,
    });
    console.log("Submitted Transaction");

    // 5. Wait for results
    console.log("\n=== 5. Waiting for result of transaction ===\n");
    const result = await aptos.waitForTransaction({ transactionHash: committedTransaction.hash });
    console.log(result)
};

example();