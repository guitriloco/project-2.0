import { FastifyInstance } from 'fastify';
import { codeSynthesisService } from '../../modules/science/codeSynthesis.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/optimize', async (request, reply) => {
    const { modulePath, code } = request.body as any;
    if (!modulePath || !code) return reply.code(400).send({ error: 'modulePath and code are required' });
    return await codeSynthesisService.optimizeLogic(modulePath, code);
  });

  fastify.get('/status', async () => {
    return await codeSynthesisService.scanStructuralRedundancies();
  });
}
