import { FastifyPluginAsync } from 'fastify';
import { greenComputingService } from '../../modules/green/green-computing.service.js';

const greenRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/schedule', async (request, reply) => {
    const { taskName, resourceRequirement } = request.body as any;
    const result = await greenComputingService.scheduleGreenTask(taskName, resourceRequirement);
    return result;
  });

  fastify.get('/nodes', async (request, reply) => {
    const nodes = await greenComputingService.getAvailableNodes();
    return { nodes };
  });
};

export default greenRoutes;
