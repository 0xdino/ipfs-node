import createNode from '../helpers/createNode';
import IpfsNode from './IpfsNode';
class RunIpfsNode {
  constructor() {}
  /**
   * @returns - IpfsNode prototype
   */
  async run() {
    return new IpfsNode(await createNode());
  }
  /**
   * @param node - IPFS node
   * @returns - IpfsNode prototype
   */
  async runFromNode(node) {
    return new IpfsNode(node);
  }
  /**
   * @returns - IPFS node
   */
  async runNode() {
    return await createNode();
  }
}
export default new RunIpfsNode();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuSXBmc05vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvUnVuSXBmc05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxVQUFVLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBRWxDLE1BQU0sV0FBVztJQUNmLGdCQUFlLENBQUM7SUFFaEI7O09BRUc7SUFDSSxLQUFLLENBQUMsR0FBRztRQUNkLE9BQU8sSUFBSSxRQUFRLENBQUMsTUFBTSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQXdCO1FBQy9DLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLE9BQU87UUFDbEIsT0FBTyxNQUFNLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELGVBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQyJ9
