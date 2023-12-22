import { Helia } from 'helia';
import { Libp2p } from 'libp2p';
import createNode from '../helpers/createNode';
import IpfsNode from './IpfsNode';

class RunIpfsNode {
  constructor() {}

  /**
   * @returns - IpfsNode prototype
   */
  public async run(): Promise<IpfsNode> {
    return new IpfsNode(await createNode());
  }

  /**
   * @param node - IPFS node
   * @returns - IpfsNode prototype
   */
  public async runFromNode(node: Helia<Libp2p<any>>): Promise<IpfsNode> {
    return new IpfsNode(node);
  }

  /**
   * @returns - IPFS node
   */
  public async runNode(): Promise<Helia<Libp2p<any>>> {
    return await createNode();
  }
}

export default new RunIpfsNode();
