# IPFS Node

[![Test CI](https://github.com/0xdino/ipfs-node/actions/workflows/test.yml/badge.svg)](https://github.com/0xdino/ipfs-node/actions/workflows/test.yml)

[ipfs-node](https://github.com/0xdino/ipfs-node) is a typescript library that simplifies the use of [IPFS](https://ipfs.tech/) based on typescript using the [helia](https://github.com/ipfs/helia) and [kubo-rpc-client](https://github.com/ipfs/js-kubo-rpc-client) library.

#### Installation:

```bash
npm install ipfs-node
#OR
yarn add ipfs-node
#OR
pnpm add ipfs-node
```

#### Example:

```ts
const ipfsNode = RunIpfsNode.run();
const buffer = Buffer.from(new TextEncoder().encode('Hello world!'));
const { cid } = await ipfsNode.push(buffer);
const res = await ipfsNode.fetch(cid);
if (res.toString() !== buffer.toString()) throw new Error('> Test fail!');
console.log('> Test passed successfully.', cid);
```

A full example of using the repository can be found here [ipfs-node-examples](https://github.com/0xdino/ipfs-node-examples).

### Usage

I strongly recommend using this module separately from the main application using the microservices structure.
For example, you can create RPC when using IPFS nodes.

### License

Licensed under MIT ([LICENSE](LICENSE) / http://opensource.org/licenses/MIT)
