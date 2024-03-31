import { run, IpfsNode } from '../dist';

const start = async () => {
  console.log('> Start test...');
  const ipfsNode: IpfsNode = await run({
    url: new URL(process.env.IPFS_API || ''),
  });

  const random =
    new Date().getTime().toString() + (Math.random() * 2 ** 64).toString(16);
  const buffer: Buffer = Buffer.from(new TextEncoder().encode(random));
  const { cid } = await ipfsNode.push(buffer, { cidVersion: 0 });
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

  console.log(new Date());
  console.log(
    'ByteLength:',
    (await ipfsNode.fetch('QmbvjL1GhiGAaeZ9TfxDtgCjQ3Nyj3KM9WXC7K9SPGfbHa'))
      .byteLength,
  );
  console.log(new Date());

  console.log(
    'List length:',
    (await ipfsNode.ls('QmVaZb25GyfxJrtCKSKNKtx7JZ5dJQ9bRq8kSP7ddovbaX'))
      .length,
  );

  console.log(new Date());
  console.log(
    'ByteLength:',
    (
      await ipfsNode.fetch(
        'QmfGF1urUaTyfNVK2VYURQTJe3SZJKB5AMUzcbU4gURZMc/217.mp4',
      )
    ).byteLength,
  );
  console.log(new Date());

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
