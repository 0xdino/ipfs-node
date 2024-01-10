import { create } from 'kubo-rpc-client';
import IpfsNode from './IpfsNode';
import createNode from '../helpers/createNode';
class RunIpfsNode {
  constructor() {}
  /**
   * @param options - IPFS HTTP Client options
   * @param node - Helia Libp2p node
   * @returns - IpfsNode prototype
   */
  async run(options, node) {
    return new IpfsNode(node || (await createNode()), create(options));
  }
}
export default new RunIpfsNode();
