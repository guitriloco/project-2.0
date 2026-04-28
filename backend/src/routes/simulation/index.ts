import { FastifyPluginAsync } from 'fastify';
import { simulationService } from '../../modules/simulation/simulation.service.js';

const simulationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/run', async (request, reply) => {
    const scenario = request.body as any;
    const result = await simulationService.runSimulation({
      id: Math.random().toString(36).substring(7),
      ...scenario,
    });
    return result;
  });

  fastify.get('/list', async (request, reply) => {
    const simulations = await simulationService.listActiveSimulations();
    return { simulations };
  });
};

export default simulationRoutes;
