const { Block } = require("./block.js");

const DIFFICULTY = 3;

async function main() {
  const genesisBlock = new Block();
  genesisBlock.display();
  await genesisBlock.mine(DIFFICULTY);

  const data = ["My Data"]; //Enter data here

  const myBlock = new Block(data, genesisBlock.getBlockHash());
  myBlock.display();
  await myBlock.mine(DIFFICULTY);
}

main();
