import { FastifyPluginAsync } from 'fastify';
import { empathyService } from '../../modules/empathy/empathy.service.js';

const empathyRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/check', async (request, reply) => {
    const { action, context } = request.body as { action: string, context: string };
    return await empathyService.checkEmpathicAlignment(action, context);
  });

  fastify.get('/pulse', async (request, reply) => {
    return await empathyService.getGlobalEmpathyPulse();
  });

  fastify.post('/translate', async (request, reply) => {
    const { message } = request.body as { message: string };
    return await empathyService.translateIntent(message);
  });
};

export default empathyRoutes;
