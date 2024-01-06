import { Options } from 'kubo-rpc-client';
import IpfsNode from './IpfsNode';
declare class RunIpfsNode {
  constructor();
  /**
   * @returns - IpfsNode prototype
   */
  run(options?: Options): IpfsNode;
}
declare const _default: RunIpfsNode;
export default _default;
