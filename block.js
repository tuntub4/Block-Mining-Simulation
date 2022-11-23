const crypto = require("crypto");

class Block {
  constructor(_data = []) {
    this.timestamp = Date.now();
    this.data = _data;
    this.hash = this.getBlockHash();
    this.prevBlockHash = "";
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
      process.stdout.write("\r\x1b[K");
      this.nonce++;
      this.hash = this.getBlockHash();
      process.stdout.write(`Trying Nonce: ${this.nonce.toString()}`);
      await new Promise((resolve) => setTimeout(resolve, 3)); //Wait 3 ms (allows nonce value to be viewed in console)
    }
    this.display();
  }

  display() {
    console.log(
      `\n\nBlock Info:\nTimestamp: ${this.timestamp}\nData: ${this.data}\nHash: ${this.hash}\nNonce: ${this.nonce}`
    );
  }
}

module.exports = { Block };
