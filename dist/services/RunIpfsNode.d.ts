import { Options } from 'kubo-rpc-client';
import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import IpfsNode from './IpfsNode';
declare class RunIpfsNode {
  constructor();
  /**
   * @param options - IPFS HTTP Client options
   * @param node - Helia Libp2p node
   * @returns - IpfsNode prototype
   */
  run(options?: Options, node?: Helia<Libp2p>): Promise<IpfsNode>;
}
declare const _default: RunIpfsNode;
export default _default;
