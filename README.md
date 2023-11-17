# IPFS Node

[ipfs-node](https://github.com/0xdino/ipfs-node) is a typescript library that simplifies the use of IPFS based on typescript using the [helia](https://github.com/ipfs/helia) library.

Example:

```ts
const ipfsNode = await RunIpfsNode.run();

const cid = await ipfsNode.push(
  Buffer.from(new TextEncoder().encode("Hello world!"))
);
console.log("> Added file:", cid.toString());

const res = await ipfsNode.fetch(cid);
console.log("> Added file contents:", new TextDecoder().decode(res));
```

A full example of using the repository can be found here [ipfs-node-examples](https://github.com/0xdino/ipfs-node-examples).

### Usage

I strongly recommend using this module separately from the main application using the microservices structure.
For example, you can create RPC when using IPFS nodes.

### License

Licensed under MIT ([LICENSE](LICENSE) / http://opensource.org/licenses/MIT)
