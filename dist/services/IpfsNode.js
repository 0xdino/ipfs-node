import { unixfs } from '@helia/unixfs';
import { create } from 'kubo-rpc-client';
import { CID } from 'multiformats';
export default class IpfsNode {
  _client;
  _node;
  _fs;
  constructor(node, client) {
    this._node = node;
    this._fs = unixfs(this._node);
    if (client) {
      this._client = client;
    } else {
      this._client = create();
    }
  }
  /**
   * @param cid - object cid in IPFS
   * @param options - See HTTPClientExtraOptions
   * @returns - Buffer of the received file from IPFS
   */
  async fetch(cid, options) {
    const chunks = [];
    for await (const chunk of this._fs.cat(cid, options)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  /**
   * @param buffer - Buffer of the file to IPFS
   * @returns
   * cid - object cid in IPFS
   * size - size of file
   * path - ipfs path
   * mode - ipfs mode
   */
  async push(buffer) {
    const { cid, size, path, mode } = await this._client.add(buffer);
    return {
      cid: new CID(cid.version, cid.code, cid.multihash, cid.bytes),
      size,
      path,
      mode,
    };
  }
  /**
   * @returns - IPFS HTTP Client
   */
  get client() {
    return this._client;
  }
  /**
   * @returns - IPFS Helia Libp2p
   */
  get node() {
    return this._node;
  }
}
