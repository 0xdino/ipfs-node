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
   * @notice Retrieve the contents from node.
   * @param cid - object cid in IPFS.
   * @param options - See CatOptions.
   * @returns - Buffer of the received file from IPFS.
   */
  async fetch(cid, options) {
    const chunks = [];
    for await (const chunk of this._fs.cat(cid, options)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  /**
   * @notice Import a file or data into IPFS.
   * @param buffer - File or data import candidate to IPFS.
   * @param options - See AddOptions & HTTPClientExtraOptions.
   * @returns cid - object cid in IPFS
   *          size - size of file
   *          path - ipfs path
   *          mode - ipfs mode
   */
  async push(buffer, options) {
    const { cid, size, path, mode } = await this._client.add(buffer, options);
    return {
      cid: new CID(cid.version, cid.code, cid.multihash, cid.bytes),
      size,
      path,
      mode,
    };
  }
  /**
   * @notice Lists a directory from IPFS that is addressed by a valid IPFS Path.
   * @param cid - object cid in IPFS.
   * @param options - see ListOptions.
   */
  async ls(cid, options) {
    const chunks = [];
    for await (const chunk of this._client.ls(cid, options)) {
      chunks.push({
        ...chunk,
        cid: new CID(
          chunk.cid.version,
          chunk.cid.code,
          chunk.cid.multihash,
          chunk.cid.bytes,
        ),
      });
    }
    return chunks;
  }
  /**
   * @returns - Kubo RPC Client
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
