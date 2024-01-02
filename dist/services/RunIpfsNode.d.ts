import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import IpfsNode from './IpfsNode';
declare class RunIpfsNode {
  constructor();
  /**
   * @returns - IpfsNode prototype
   */
  run(): Promise<IpfsNode>;
  /**
   * @param node - IPFS node
   * @returns - IpfsNode prototype
   */
  runFromNode(node: Helia<Libp2p<any>>): Promise<IpfsNode>;
  /**
   * @returns - IPFS node
   */
  runNode(): Promise<Helia<Libp2p<any>>>;
}
declare const _default: RunIpfsNode;
export default _default;
