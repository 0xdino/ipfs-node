import { CID } from 'multiformats/cid';

export type CIDVersion = 0 | 1;

export interface AbortOptions {
  /**
   * Can be provided to a function that starts a long running task, which will
   * be aborted when signal is triggered.
   */
  signal?: AbortSignal;
  /**
   * Can be provided to a function that starts a long running task, which will
   * be aborted after provided timeout (in ms).
   */
  timeout?: number;
}

export interface AddProgressFn {
  (bytes: number, path?: string): void;
}

export interface AddOptions extends AbortOptions {
  /**
   * Chunking algorithm used to build ipfs DAGs. (defaults to 'size-262144')
   */
  chunker?: string;
  /**
   * The CID version to use when storing the data
   */
  cidVersion?: CIDVersion;

  /**
   * Multihash hashing algorithm to use. (Defaults to 'sha2-256')
   */
  hashAlg?: string;

  /**
   * If true, will not add blocks to the blockstore. (Defaults to `false`)
   */
  onlyHash?: boolean;

  /**
   * Pin this object when adding. (Defaults to `true`)
   */
  pin?: boolean;

  /**
   * A function that will be called with the number of bytes added as a file is
   * added to ipfs and the path of the file being added.
   *
   * **Note** It will not be called for directory entries.
   */
  progress?: AddProgressFn;

  /**
   * If true, DAG leaves will contain raw file data and not be wrapped in a
   * protobuf. (Defaults to `false`)
   */
  rawLeaves?: boolean;

  /**
   * If true will use the
   * [trickle DAG](https://godoc.org/github.com/ipsn/go-ipfs/gxlibs/github.com/ipfs/go-unixfs/importer/trickle)
   * format for DAG generation. (Defaults to `false`).
   */
  trickle?: boolean;

  /**
   * Adds a wrapping node around the content. (Defaults to `false`)
   */
  wrapWithDirectory?: boolean;

  /**
   * Whether to preload all blocks created during this operation
   */
  preload?: boolean;

  /**
   * How many blocks from a file to write concurrently
   */
  blockWriteConcurrency?: number;
}

export interface Mtime {
  secs: bigint;
  nsecs?: number;
}

export type MtimeLike =
  | Mtime
  | { Seconds: number; FractionalNanoseconds?: number }
  | [number, number]
  | Date;

export type ImportCandidate = ToFile | Buffer;

export interface ToFile extends ToFileMetadata {
  path: string;
}

export interface ToFileMetadata {
  mode?: ToMode;
  mtime?: MtimeLike;
}

export type ToMode = string | number;

export interface PreloadOptions {
  preload?: boolean;
}

export interface ListOptions extends AbortOptions, PreloadOptions {}

export interface IPFSEntry {
  readonly type: 'dir' | 'file';
  readonly cid: CID;
  readonly name: string;
  readonly path: string;
  mode?: number;
  mtime?: Mtime;
  size: number;
}

export interface AddResult {
  readonly cid: CID;
  readonly size: number;
  readonly path: string;
  mode?: number;
}
