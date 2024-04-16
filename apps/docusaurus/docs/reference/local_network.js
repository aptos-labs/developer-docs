const {
    LocalNode,
    Aptos,
    AptosConfig,
    Network,
} = require("@aptos-labs/ts-sdk");

// const { LocalNode, AptosConfig, Aptos } = require("@aptos-labs/ts-sdk");

// Initiate a LocalNode instance
const localNode = new LocalNode();

// Run a local node
localNode.run();

// Write some tests
test("test my app", async () => {
  const aptosConfig = new AptosConfig({network:Network.LOCAL})
  const aptos = new Aptos(aptosConfig)
  // rest of test.....
})

// Stop the local node
localNode.stop();