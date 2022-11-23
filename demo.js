const { Block } = require("./block.js");

const data = ["Kevin"]; //Enter data here

const myBlock = new Block(data);

myBlock.mine(3);
