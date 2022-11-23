const crypto = require("crypto");

const MS = 3; // number of ms to wait between nonce incrementations

class Block {
  constructor(_data = [], _prevBlockHash = "") {
    this.timestamp = Date.now();
    this.data = _data;
    this.hash = this.getBlockHash();
    this.prevBlockHash = _prevBlockHash;
    this.nonce = 0;
  }

  getBlockHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.prevBlockHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }

  //Brute force to guess hash that starts with {difficulty} zeroes. Increment nonce each iteration.
  async mine(difficulty) {
    process.stdout.write(`Mining Block!\n`);

    while (!this.hash.toString().startsWith(Array(difficulty + 1).join("0"))) {
      process.stdout.write("\r\x1b[K"); //Delete previous line to allow console to count in place
      this.nonce++;
      this.hash = this.getBlockHash();
      process.stdout.write(`Trying Nonce: ${this.nonce.toString()}`);
      await new Promise((resolve) => setTimeout(resolve, MS)); //Wait to allow nonce value to be viewed in console
    }

    process.stdout.write(`\nBlock Mined!`);
    this.display(); //After mining is complete, display block data
  }

  display() {
    console.log(
      `\n\nBlock Info:\nTimestamp: ${this.timestamp}\nData: ${this.data}\nHash: ${this.hash}\nPrevious Block Hash: ${this.prevBlockHash}\nNonce: ${this.nonce}\n`
    );
  }
}

module.exports = { Block };
