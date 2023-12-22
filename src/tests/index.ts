import { CID, Version } from 'multiformats';
import RunIpfsNode, { IpfsNode } from '..';

const start = async (): Promise<CID<unknown, number, number, Version>> => {
  const ipfsNode: IpfsNode = await RunIpfsNode.run();
  const buffer: Buffer = Buffer.from(new TextEncoder().encode('Hello world!'));
  const cid: CID<unknown, number, number, Version> =
    await ipfsNode.push(buffer);
  const res: Buffer = await ipfsNode.fetch(cid);
  if (res.toString() !== buffer.toString()) throw new Error('> Test fail!');
  return cid;
};

start()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then((e) => {
    console.log('> Test passed successfully.', e);
    process.exit(0);
  });
