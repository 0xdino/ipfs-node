/// <reference types="node" />
import { Helia } from 'helia';
import { CatOptions } from '@helia/unixfs';
import { IPFSHTTPClient } from 'kubo-rpc-client';
import { Libp2p } from 'libp2p';
import { CID } from 'multiformats';
export interface IAddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}
export default class IpfsNode {
  private readonly _client;
  private readonly _node;
  private readonly _fs;
  constructor(node: Helia<Libp2p>, client?: IPFSHTTPClient);
  /**
   * @param cid - object cid in IPFS
   * @param options - See HTTPClientExtraOptions
   * @returns - Buffer of the received file from IPFS
   */
  fetch(
    cid: string | CID,
    options?: Partial<CatOptions> | undefined,
  ): Promise<Buffer>;
  /**
   * @param buffer - Buffer of the file to IPFS
   * @returns
   * cid - object cid in IPFS
   * size - size of file
   * path - ipfs path
   * mode - ipfs mode
   */
  push(buffer: Buffer): Promise<IAddResult>;
  /**
   * @returns - IPFS HTTP Client
   */
  get client(): IPFSHTTPClient;
  /**
   * @returns - IPFS Helia Libp2p
   */
  get node(): Helia<Libp2p>;
}
