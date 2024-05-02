import { Helia } from 'helia';
import { CatOptions, UnixFS, unixfs } from '@helia/unixfs';
import { KuboRPCClient, create } from 'kubo-rpc-client';
import { Libp2p } from 'libp2p';
import { CID } from 'multiformats';
import {
  AddOptions,
  AddResult,
  ImportCandidate,
  IPFSEntry,
  ListOptions,
} from '../types';

export default class IpfsNode {
  private readonly _client: KuboRPCClient;
  private readonly _node: Helia<Libp2p>;
  private readonly _fs: UnixFS;

  constructor(node: Helia<Libp2p>, client?: KuboRPCClient) {
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
  public async fetch(
    cid: string | CID,
    options?: Partial<CatOptions> | undefined,
  ): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this._fs.cat(cid as CID, options)) {
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
  public async push(
    buffer: ImportCandidate,
    options?: AddOptions | undefined,
  ): Promise<AddResult> {
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
  public async ls(cid: string | CID, options?: ListOptions | undefined) {
    const chunks: IPFSEntry[] = [];
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
  get client(): KuboRPCClient {
    return this._client;
  }

  /**
   * @returns - IPFS Helia Libp2p
   */
  get node(): Helia<Libp2p> {
    return this._node;
  }
}
