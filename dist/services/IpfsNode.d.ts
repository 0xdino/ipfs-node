/// <reference types="node" />
import { HTTPClientExtraOptions, IPFSHTTPClient } from 'kubo-rpc-client';
import { CID } from 'multiformats';
export interface IAddResult {
  cid: CID;
  size: number;
  path: string;
  mode?: number;
}
export default class IpfsNode {
  private readonly _client;
  constructor(client?: IPFSHTTPClient);
  /**
   * @param cid - object cid in IPFS
   * @param options - See HTTPClientExtraOptions
   * @returns - Buffer of the received file from IPFS
   */
  fetch(cid: string | CID, options?: HTTPClientExtraOptions): Promise<Buffer>;
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
  get node(): IPFSHTTPClient;
}
