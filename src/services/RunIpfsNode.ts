import { Options, create } from 'kubo-rpc-client';
import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import IpfsNode from './IpfsNode';
import createNode from '../helpers/createNode';

class RunIpfsNode {
  constructor() {}

  /**
   * @param options - IPFS HTTP Client options
   * @param node - Helia Libp2p node
   * @returns - IpfsNode prototype
   */
  public async run(options?: Options, node?: Helia<Libp2p>): Promise<IpfsNode> {
    return new IpfsNode(node || (await createNode()), create(options));
  }
}

export default new RunIpfsNode();
