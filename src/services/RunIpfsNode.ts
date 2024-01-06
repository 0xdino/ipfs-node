import { Options, create } from 'kubo-rpc-client';
import IpfsNode from './IpfsNode';

class RunIpfsNode {
  constructor() {}

  /**
   * @returns - IpfsNode prototype
   */
  public run(options?: Options): IpfsNode {
    return new IpfsNode(create(options));
  }
}

export default new RunIpfsNode();
