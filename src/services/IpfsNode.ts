import { CatOptions, UnixFS, unixfs } from "@helia/unixfs";
import { Helia } from "helia";
import { Libp2p } from "libp2p";
import { CID, Version } from "multiformats/cid";

export default class IpfsNode {
  private readonly _node: Helia<Libp2p<any>>;
  private readonly _fs: UnixFS;

  constructor(node: Helia<Libp2p<any>>) {
    this._fs = unixfs(node);
    this._node = node;
  }

  /**
   * @param cid - object cid in IPFS
   * @param options - See Partial<CatOptions>
   * @returns - Buffer of the received file from IPFS
   */
  public async fetch(
    cid: string | CID<unknown, number, number, Version>,
    options?: Partial<CatOptions> | undefined
  ): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this._fs.cat(cid as CID, options)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  /**
   * @param buffer - Buffer of the file to IPFS
   * @returns - object cid in IPFS
   */
  public async push(
    buffer: Buffer
  ): Promise<CID<unknown, number, number, Version>> {
    return await this._fs.addBytes(buffer);
  }

  get node(): Helia<Libp2p<any>> {
    return this._node;
  }

  get fs(): UnixFS {
    return this._fs;
  }
}
