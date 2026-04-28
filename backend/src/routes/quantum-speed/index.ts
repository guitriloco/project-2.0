import { FastifyPluginAsync } from 'fastify';
import { quantumSpeedService } from '../../modules/quantum-speed/quantum-speed.service.js';

const quantumSpeedRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/simulate', async (request, reply) => {
    const { operationName } = request.body as { operationName: string };
    const result = await quantumSpeedService.simulateSubQuantumProcessing(operationName);
    return result;
  });

  fastify.get('/metrics', async (request, reply) => {
    const status = await quantumSpeedService.getQuantumMetrics();
    return status;
  });
};

export default quantumSpeedRoutes;
