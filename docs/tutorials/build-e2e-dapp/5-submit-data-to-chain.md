---
title: "5. Submit Data to Chain"
id: "submit-data-to-chain"
---

# 5. Submit Data to Chain

In the fifth chapter of the tutorial on [building an end-to-end dapp on Aptos](./index.md), you will be submitting data to the chain.

So now we have an **Add new list** button that appears if the connected account hasn’t created a list yet. We still don't have a way for an account to create a list, so let’s add that functionality.

1. First, our wallet adapter provider has a `signAndSubmitTransaction` function; let’s extract it by updating the following:

```js
const { account, signAndSubmitTransaction } = useWallet();
```

2. Add an `onClick` event to the new list button:

```js
<Button
  onClick={addNewList}
  block
  type="primary"
  style={{ height: "40px", backgroundColor: "#3f67ff" }}
>
  Add new list
</Button>
```

3. Update the import statement from `@aptos-labs/wallet-adapter-react` to also import the `InputTransactionData` type and

```js
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
```

4. Add the `addNewList` function:

```js

const addNewList = async () => {
  if (!account) return [];

   const transaction:InputTransactionData = {
      data: {
        function:`${moduleAddress}::todolist::create_list`,
        functionArguments:[]
      }
    }
  try {
    // sign and submit transaction to chain
    const response = await signAndSubmitTransaction(transaction);
    // wait for transaction
    await aptos.waitForTransaction({transactionHash:response.hash});
    setAccountHasList(true);
  } catch (error: any) {
    setAccountHasList(false);
  }
};
```

5. Since our new function also uses `moduleAddress`, let’s get it out of the `fetchList` function scope to the global scope so it can be used globally.

In our `fetchList` function, find the line:

```js
// replace with your own address
const moduleAddress =
  "0xcbddf398841353776903dbab2fdaefc54f181d07e114ae818b1a67af28d1b018";
```

And move it to outside of the main `App` function, right beneath our const `provider` declarations.

```js
export const aptos = new Aptos();
// change this to be your module account address
export const moduleAddress =
  "0xcbddf398841353776903dbab2fdaefc54f181d07e114ae818b1a67af28d1b018";
```

**Let’s go over the `addNewList` function code.**

First, we use the `account` property from our wallet provider to make sure there is an account connected to our app.

Then we build our transaction data to be submitted to chain:

```js
const transaction:InputTransactionData = {
      data: {
        function:`${moduleAddress}::todolist::create_list`,
        functionArguments:[]
      }
    }
```

- `function`- is built from the module address, module name and the function name.
- `functionArguments` - the arguments the function expects, in our case it doesn’t expect any arguments.

Next, we submit the transaction payload and wait for its response. The response returned from the `signAndSubmitTransaction` function holds the transaction hash. Since it can take a bit for the transaction to be fully executed on chain and we also want to make sure it is executed successfully, we `waitForTransaction`. And only then we can set our local `accountHasList` state to `true`.

6. Before testing our app, let’s tweak our UI a bit and add a Spinner component to show up while we are waiting for the transaction.
   Add a local state to keep track whether a transaction is in progress:

```ts
const [transactionInProgress, setTransactionInProgress] =
  useState<boolean>(false);
```

7. Update our `addNewList` function to update the local state:

```js
const addNewList = async () => {
  if (!account) return [];
  setTransactionInProgress(true);
  const transaction:InputTransactionData = {
      data: {
        function:`${moduleAddress}::todolist::create_list`,
        functionArguments:[]
      }
    }
  try {
    // sign and submit transaction to chain
    const response = await signAndSubmitTransaction(transaction);
    // wait for transaction
    await aptos.waitForTransaction({transactionHash:response.hash});
    setAccountHasList(true);
  } catch (error: any) {
    setAccountHasList(false);
  } finally {
    setTransactionInProgress(false);
  }
};
```

8. Update the important statement from `antd` to also import `Spin`

```js
import { Layout, Row, Col, Button, Spin } from "antd";
```

9. Update our UI with the following:

```jsx
return (
  <>
    ...
    <Spin spinning={transactionInProgress}>
      {!accountHasList && (
        <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
          <Col span={8} offset={8}>
            <Button
              onClick={addNewList}
              block
              type="primary"
              style={{ height: "40px", backgroundColor: "#3f67ff" }}
            >
              Add new list
            </Button>
          </Col>
        </Row>
      )}
    </Spin>
  </>
);
```

Now you can head over to our app, and add a new list!

Since you haven’t made the user interface able to handle cases where an account has created a list, you will do so next [handling tasks](./6-handle-tasks.md) in chapter 6.
