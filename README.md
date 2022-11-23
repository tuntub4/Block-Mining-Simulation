# Block-Mining-Simulation
Using a simple Block implementation, creates and mines a genesis block, then creates and mines a block with user data.

### How to use
Install dependencies using `yarn init` and `yarn install` and run using `node demo.js`

### Notes
Adjust required zeroes for valid hash by changing `DIFFICULTY` in demo.js
*Warning: difficulty values greater than 3 may be impractical for demo*

Adjust time to increment nonce by changing `MS` constant in block.js
