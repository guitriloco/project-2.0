import { FastifyInstance } from 'fastify';
import { web3Service } from '../../modules/web3/web3.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/resolve', async (request, reply) => {
    const { address } = request.body as any;
    if (!address) return reply.code(400).send({ error: 'Address is required' });
    return await web3Service.resolveIdentity(address);
  });

  fastify.post('/ipfs/upload', async (request, reply) => {
    const { content } = request.body as any;
    if (!content) return reply.code(400).send({ error: 'Content is required' });
    return await web3Service.uploadToIPFS(content);
  });

  fastify.get('/metrics', async () => {
    return await web3Service.getSovereigntyMetrics();
  });
}
