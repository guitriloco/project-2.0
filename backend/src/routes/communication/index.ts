import { FastifyPluginAsync } from 'fastify';
import { communicationService } from '../../modules/communication/communication.service.js';

const communicationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/decode', async (request, reply) => {
    const { signal, medium } = request.body as { signal: string, medium: string };
    return await communicationService.decodeSignal(signal, medium);
  });

  fastify.post('/translate', async (request, reply) => {
    const { directive, speciesProfile } = request.body as any;
    return await communicationService.translateToSpecies(directive, speciesProfile);
  });
};

export default communicationRoutes;
