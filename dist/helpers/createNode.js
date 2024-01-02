import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { bootstrap } from '@libp2p/bootstrap';
import { tcp } from '@libp2p/tcp';
import { MemoryBlockstore } from 'blockstore-core';
import { MemoryDatastore } from 'datastore-core';
import { createHelia } from 'helia';
import { createLibp2p } from 'libp2p';
import { identify } from '@libp2p/identify';
export default async function createNode() {
  const blockstore = new MemoryBlockstore();
  const datastore = new MemoryDatastore();
  const libp2p = await createLibp2p({
    datastore,
    addresses: {
      listen: ['/ip4/127.0.0.1/tcp/0'],
    },
    transports: [tcp()],
    connectionEncryption: [noise()],
    streamMuxers: [yamux()],
    peerDiscovery: [
      bootstrap({
        list: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
          '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        ],
      }),
    ],
    services: {
      identify: identify(),
    },
  });
  return await createHelia({
    datastore,
    blockstore,
    libp2p,
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2NyZWF0ZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNwQyxPQUFPLEVBQVUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssVUFBVSxVQUFVO0lBQ3RDLE1BQU0sVUFBVSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sTUFBTSxHQUFXLE1BQU0sWUFBWSxDQUFDO1FBQ3hDLFNBQVM7UUFDVCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNqQztRQUNELFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLG9CQUFvQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsYUFBYSxFQUFFO1lBQ2IsU0FBUyxDQUFDO2dCQUNSLElBQUksRUFBRTtvQkFDSixpRkFBaUY7b0JBQ2pGLGlGQUFpRjtvQkFDakYsaUZBQWlGO29CQUNqRixpRkFBaUY7b0JBQ2pGLGlGQUFpRjtpQkFDbEY7YUFDRixDQUFDO1NBQ0g7UUFDRCxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUUsUUFBUSxFQUFFO1NBQ3JCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLFdBQVcsQ0FBQztRQUN2QixTQUFTO1FBQ1QsVUFBVTtRQUNWLE1BQU07S0FDUCxDQUFDLENBQUM7QUFDTCxDQUFDIn0=
