import {
  HTTPClientExtraOptions,
  IPFSHTTPClient,
  create,
} from 'kubo-rpc-client';
import { CID } from 'multiformats';

export interface IAddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}

export default class IpfsNode {
  private readonly _client: IPFSHTTPClient;

  constructor(client?: IPFSHTTPClient) {
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
    options?: HTTPClientExtraOptions,
  ): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this._client.cat(cid, options)) {
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
  get node(): IPFSHTTPClient {
    return this._client;
  }
}
