/**
 * This example shows how to use the Aptos SDK to send a transaction.
 */

import {
    Account,
    Aptos,
    AptosConfig,
    Network,
    InputGenerateTransactionPayloadData,
} from "@aptos-labs/ts-sdk";

async function example() {
    console.log("This example will create two accounts (Alice and Bob) and send a transaction transfering APT to Bob's account.");

    // 0. Setup the client and test accounts
    const config = new AptosConfig({ network: Network.DEVNET });
    const aptos = new Aptos(config);

    let sender = Account.generate();

    console.log("=== Addresses ===\n");
    console.log(`Sender's address is: ${sender.accountAddress}`);

    console.log("\n=== Funding sender ===\n");
    await aptos.fundAccount({
        accountAddress: sender.accountAddress,
        amount: 100_000_000,
    });  
    console.log("Funded the sender account!")

    // Generate several recipients to send APT to
    const recipients = [Account.generate(), Account.generate(), Account.generate()];

    // Create transactions to send APT to each account
    const transactions: InputGenerateTransactionPayloadData[] = [];

    for (let i = 0; i < recipients.length; i += 1) {
        const transaction: InputGenerateTransactionPayloadData = {
            function: "0x1::aptos_account::transfer",
            functionArguments: [recipients[i].accountAddress, 10],
        };
        transactions.push(transaction);
    }

    // Sign and submit all transactions as fast as possible (throws if any error)
    await aptos.transaction.batch.forSingleAccount({ sender: sender, data: transactions });
};

example();
