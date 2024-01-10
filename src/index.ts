import { Options } from 'kubo-rpc-client';
import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import IpfsNode from './services/IpfsNode';
import RunIpfsNode from './services/RunIpfsNode';
import createNode from './helpers/createNode';

export { RunIpfsNode as default, IpfsNode, createNode };
export const run: (
  options?: Options | undefined,
  node?: Helia<Libp2p> | undefined,
) => Promise<IpfsNode> = RunIpfsNode.run;
