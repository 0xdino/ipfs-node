import { unixfs } from '@helia/unixfs';
export default class IpfsNode {
  _node;
  _fs;
  constructor(node) {
    this._fs = unixfs(node);
    this._node = node;
  }
  /**
   * @param cid - object cid in IPFS
   * @param options - See Partial<CatOptions>
   * @returns - Buffer of the received file from IPFS
   */
  async fetch(cid, options) {
    const chunks = [];
    for await (const chunk of this._fs.cat(cid, options)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  /**
   * @param buffer - Buffer of the file to IPFS
   * @returns - object cid in IPFS
   */
  async push(buffer) {
    return await this._fs.addBytes(buffer);
  }
  get node() {
    return this._node;
  }
  get fs() {
    return this._fs;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXBmc05vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvSXBmc05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFzQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0QsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFRO0lBQ1YsS0FBSyxDQUFxQjtJQUMxQixHQUFHLENBQVM7SUFFN0IsWUFBWSxJQUFtQjtRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxLQUFLLENBQ2hCLEdBQW1ELEVBQ25ELE9BQXlDO1FBRXpDLE1BQU0sTUFBTSxHQUFpQixFQUFFLENBQUM7UUFDaEMsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLE1BQWM7UUFFZCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRiJ9
