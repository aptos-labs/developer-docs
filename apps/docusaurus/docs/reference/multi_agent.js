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
        amount: 100,
    });
    await aptos.fundAccount({
        accountAddress: carol.accountAddress,
        amount: 100,
    });
    console.log("Done funding accounts.")

    // 1. Build
    console.log("\n=== 1. Building the transaction ===\n");
    const transaction = await aptos.transaction.build.multiAgent({
        sender: alice.accountAddress,
        secondarySignerAddresses: [bob.accountAddress],
        data: {
            // All transactions on Aptos are implemented via smart contracts.
            function: "0x1::coin::transfer",
            typeArguments: [parseTypeTag("0x1::aptos_coin::AptosCoin")],
            functionArguments: [carol.accountAddress, 100],
        },
    });
    console.log("Transaction:", transaction)

    // 2. Simulate (Optional)
    const [userTransactionResponse] = await aptos.transaction.simulate.multiAgent({
        signerPublicKey: alice.publicKey,
        secondarySignersPublicKeys: [bob.publicKey],
        transaction,
    });
    console.log("\n === 2. Simulated Response === \n")
    console.log(userTransactionResponse)

    // 3. Sign
    const aliceSenderAuthenticator = aptos.transaction.sign({
        signer: alice,
        transaction,
    });
    const bobSenderAuthenticator = aptos.transaction.sign({
        signer: bob,
        transaction
    })
    console.log("\n=== 3. Signed transaction ===\n");
    console.log(aliceSenderAuthenticator)
    console.log(bobSenderAuthenticator)

    // 4. Submit
    const committedTransaction = await aptos.transaction.submit.multiAgent({
        transaction,
        senderAuthenticator: aliceSenderAuthenticator,
        additionalSignersAuthenticators: [bobSenderAuthenticator],
    });

    console.log("\n=== 4. Submitted transaction hash ===\n");
    console.log(`Committed transaction: ${committedTransaction.hash}`);

    // 5. Wait for results
    const result = await aptos.waitForTransaction({ transactionHash: committedTransaction.hash });

    console.log("\n=== 5. Result of transaction ===\n");
    console.log(result)
};

example();