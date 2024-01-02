/// <reference types="node" />
import { CatOptions, UnixFS } from '@helia/unixfs';
import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import { CID, Version } from 'multiformats';
export default class IpfsNode {
  private readonly _node;
  private readonly _fs;
  constructor(node: Helia<Libp2p>);
  /**
   * @param cid - object cid in IPFS
   * @param options - See Partial<CatOptions>
   * @returns - Buffer of the received file from IPFS
   */
  fetch(
    cid: string | CID<unknown, number, number, Version>,
    options?: Partial<CatOptions> | undefined,
  ): Promise<Buffer>;
  /**
   * @param buffer - Buffer of the file to IPFS
   * @returns - object cid in IPFS
   */
  push(buffer: Buffer): Promise<CID<unknown, number, number, Version>>;
  get node(): Helia<Libp2p<any>>;
  get fs(): UnixFS;
}
