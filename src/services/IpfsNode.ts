import { Helia } from 'helia';
import { CatOptions, UnixFS, unixfs } from '@helia/unixfs';
import { IPFSHTTPClient, create } from 'kubo-rpc-client';
import { Libp2p } from 'libp2p';
import { CID } from 'multiformats';

export interface IAddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}

export default class IpfsNode {
  private readonly _client: IPFSHTTPClient;
  private readonly _node: Helia<Libp2p>;
  private readonly _fs: UnixFS;

  constructor(node: Helia<Libp2p>, client?: IPFSHTTPClient) {
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
   * @param buffer - Buffer of the file to IPFS
   * @returns
   * cid - object cid in IPFS
   * size - size of file
   * path - ipfs path
   * mode - ipfs mode
   */
  public async push(buffer: Buffer): Promise<IAddResult> {
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
  get client(): IPFSHTTPClient {
    return this._client;
  }

  /**
   * @returns - IPFS Helia Libp2p
   */
  get node(): Helia<Libp2p> {
    return this._node;
  }
}
