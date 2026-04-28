import { evolutionService } from '../../modules/evolution/evolution.service.js';

export default async function (fastify: any) {
  fastify.get('/status', async () => {
    return await evolutionService.getSelfHealingStatus();
  });

  fastify.post('/analyze', async () => {
    return await evolutionService.analyzeSystemState();
  });

  fastify.post('/apply', async (request: any) => {
    const { evolutionName } = request.body;
    return await evolutionService.applyEvolution(evolutionName);
  });
}
