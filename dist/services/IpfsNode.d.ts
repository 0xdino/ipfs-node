/// <reference types="node" />
import { Helia } from 'helia';
import { CatOptions } from '@helia/unixfs';
import { HTTPClientExtraOptions, IPFSHTTPClient } from 'kubo-rpc-client';
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
  private readonly _client;
  private readonly _node;
  private readonly _fs;
  constructor(node: Helia<Libp2p>, client?: IPFSHTTPClient);
  /**
   * @notice Retrieve the contents from node.
   * @param cid - object cid in IPFS.
   * @param options - See CatOptions.
   * @returns - Buffer of the received file from IPFS.
   */
  fetch(
    cid: string | CID,
    options?: Partial<CatOptions> | undefined,
  ): Promise<Buffer>;
  /**
   * @notice Import a file or data into IPFS.
   * @param buffer - File or data import candidate to IPFS.
   * @param options - See AddOptions & HTTPClientExtraOptions.
   * @returns cid - object cid in IPFS
   *          size - size of file
   *          path - ipfs path
   *          mode - ipfs mode
   */
  push(
    buffer: ImportCandidate,
    options?: (AddOptions & HTTPClientExtraOptions) | undefined,
  ): Promise<AddResult>;
  /**
   * @notice Lists a directory from IPFS that is addressed by a valid IPFS Path.
   * @param cid - object cid in IPFS.
   * @param options - see ListOptions.
   */
  ls(
    cid: string | CID,
    options?: (ListOptions & HTTPClientExtraOptions) | undefined,
  ): Promise<IPFSEntry[]>;
  /**
   * @returns - IPFS HTTP Client
   */
  get client(): IPFSHTTPClient;
  /**
   * @returns - IPFS Helia Libp2p
   */
  get node(): Helia<Libp2p>;
}
