import RunIpfsNode from "..";

const start = async () => {
  const ipfsNode = await RunIpfsNode.run();
  const buffer = Buffer.from(new TextEncoder().encode("Hello world!"));
  const cid = await ipfsNode.push(buffer);
  const res = await ipfsNode.fetch(cid);
  if (res.toString() !== buffer.toString()) throw new Error("> Test fail!");
  return cid;
};

start()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then((e) => {
    console.log("> Test passed successfully.", e);
    process.exit(0);
  });
