import { FastifyPluginAsync } from 'fastify';
import { foresightService } from '../../modules/temporal/foresight.service.js';

const temporalRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/simulate', async (request, reply) => {
    const { context } = request.body as { context: string };
    return await foresightService.runForesightSimulation(context);
  });

  fastify.post('/apply-fix', async (request, reply) => {
    const { scenarioId } = request.body as { scenarioId: string };
    return await foresightService.applyFutureFix(scenarioId);
  });
};

export default temporalRoutes;
