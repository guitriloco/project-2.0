import { nectarAggregatorService } from '../../modules/nectar/nectarAggregator.service.js';

export default async function (fastify: any) {
  fastify.get('/stream', async (request: any, reply: any) => {
    // For Long-Polling simulation
    // In a real app, this would wait for new events or use WebSockets
    const signals = await nectarAggregatorService.aggregateSignals();
    return {
      status: 'SUCCESS',
      stream: 'NECTAR_V1',
      data: signals,
      timestamp: Date.now()
    };
  });

  fastify.get('/events', async (request: any, reply: any) => {
    return {
      status: 'SUCCESS',
      events: nectarAggregatorService.getSignals()
    };
  });

  fastify.post('/refresh', async (request: any, reply: any) => {
    const signals = await nectarAggregatorService.aggregateSignals();
    return {
      status: 'REFRESHED',
      count: signals.length
    };
  });
}
