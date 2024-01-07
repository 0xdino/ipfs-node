import RunIpfsNode, { IpfsNode } from '../dist';

const start = async () => {
  console.log('> Start test...');
  const ipfsNode: IpfsNode = RunIpfsNode.run({
    url: new URL('http://127.0.0.1:5001'),
  });

  const random =
    new Date().getTime().toString() + (Math.random() * 2 ** 64).toString(16);
  const buffer: Buffer = Buffer.from(new TextEncoder().encode(random));
  const { cid } = await ipfsNode.push(buffer);
  const res: Buffer = await ipfsNode.fetch(cid);
  if (res.toString() !== buffer.toString()) throw new Error('> Test fail!');

  if (
    (
      await ipfsNode.fetch(
        'bafkreigaknpexyvxt76zgkitavbwx6ejgfheup5oybpm77f3pxzrvwpfdi',
      )
    ).toString() !== 'Hello world!'
  )
    throw new Error('> Test fail!');

  return { cid, random };
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
