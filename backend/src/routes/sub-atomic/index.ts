import { FastifyInstance } from 'fastify';
import { subAtomicService } from '../../modules/sub-atomic/sub-atomic.service.js';

export default async function subAtomicRoutes(fastify: FastifyInstance) {
  fastify.post('/network/simulate', async (request, reply) => {
    return await subAtomicService.simulateNetwork();
  });

  fastify.post('/computation/simulate', async (request, reply) => {
    return await subAtomicService.simulateComputation();
  });

  fastify.post('/storage/simulate', async (request, reply) => {
    return await subAtomicService.simulateStorage();
  });

  fastify.post('/sovereignty/ensure', async (request, reply) => {
    return await subAtomicService.ensureNetworkSovereignty();
  });

  fastify.post('/repair', async (request, reply) => {
    return await subAtomicService.performSelfRepair();
  });

  fastify.post('/logic/synthesize', async (request, reply) => {
    return await subAtomicService.synthesizeUniversalLogic();
  });

  fastify.post('/reality/sync', async (request, reply) => {
    return await subAtomicService.syncSubAtomicReality();
  });

  fastify.post('/shield/activate', async (request, reply) => {
    return await subAtomicService.activateIntegrityShield();
  });
}
