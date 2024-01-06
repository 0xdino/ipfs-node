import { create } from 'kubo-rpc-client';
import IpfsNode from './IpfsNode';
class RunIpfsNode {
  constructor() {}
  /**
   * @returns - IpfsNode prototype
   */
  run(options) {
    return new IpfsNode(create(options));
  }
}
export default new RunIpfsNode();
