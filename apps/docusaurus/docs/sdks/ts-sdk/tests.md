---
title: "Tests"
---

# SDK Tests

The SDK uses two types of tests, `e2e` and `unit` tests, located under the [tests](https://github.com/aptos-labs/aptos-ts-sdk/tree/main/tests) folder.

## Unit Tests

Unit tests are meant to test the output of a function in the SDK with the provided input. For example, we can test whether an account address is valid.

```ts
test("account address is valid", () => {
  const { valid } = AccountAddress.isValid({
    input: "0x1",
  });
  expect(valid).toBe(true);
});
```

Can check [here](https://github.com/aptos-labs/aptos-ts-sdk/tree/main/tests/unit) all the SDK unit tests

## E2E Tests

End-to-end tests are meant to test the end-to-end operations starting from the SDK methods to the interaction with the REST/Indexer API and a smart contract and up to the blockchain level.

For example, to test if a transaction has been submitted, we start with building the transaction payload the SDK expects, post the submit request to the REST API, and fetch the transaction data to make sure it has been fully submitted to the blockchain.

```ts
test("transaction submission", async () => {
  const transaction = await aptos.transaction.build.simple({
    sender: sender.accountAddress,
    data: {
      function: `0x1::aptos_account::transfer`,
      functionArguments: [receiver.accountAddress, 1],
    },
  });
  const response = await aptos.signAndSubmitTransaction({
    signer: sender,
    transaction,
  });
  await aptos.waitForTransaction({
    transactionHash: response.hash,
  });
  expect(response.success).toBe(true);
});
```

Can check [here](https://github.com/aptos-labs/aptos-ts-sdk/tree/main/tests/e2e) all the SDK e2e tests

## Integration Tests

The SDK provides an easy way to run integration tests by spinning up a local node and run tests against it. For example, one can build their integration tests against a local node with the sdk like that:

```ts
import { LocalNode, AptosConfig, Aptos } from "@aptos-labs/ts-sdk";
// initiate a LocalNode instance
const localNode = new LocalNode();
// Run a local node
await localNode.run();
// Write some tests
test("test my app", async () => {
  const aptosConfig = new AptosConfig({network:Network.LOCAL})
  const aptos = new Aptos(aptosConfig)
  // rest of test.....
}
// Stop the local node
localNode.stop();
```
