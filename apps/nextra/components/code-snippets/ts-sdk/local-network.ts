import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { LocalNode } from "@aptos-labs/ts-sdk/dist/common/cli/index.js";

async function example() {
  // Initiate a LocalNode instance
  const localNode = new LocalNode();

  // Run a local node
  await localNode.run();

  // // Write some tests
  // async function test() {
  //     await localNode.waitUntilProcessIsUp();
  //     const aptosConfig = new AptosConfig({ network: Network.LOCAL });
  //     const aptos = new Aptos(aptosConfig);
  //     // rest of test.....
  // }
  // await test()

  // // Stop the local node
  // await localNode.stop();
}

example();
