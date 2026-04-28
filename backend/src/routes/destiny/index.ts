import { FastifyPluginAsync } from 'fastify';
import { destinyEngineService } from '../../modules/destiny/destiny.service.js';

const destinyRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/forecast', async (request, reply) => {
    const { timeframeYears } = request.body as { timeframeYears?: number };
    const result = await destinyEngineService.forecastDestiny(timeframeYears);
    return result;
  });

  fastify.get('/milestones', async (request, reply) => {
    const milestones = await destinyEngineService.getHistoricalDestinyLogs();
    return { milestones };
  });
};

export default destinyRoutes;
