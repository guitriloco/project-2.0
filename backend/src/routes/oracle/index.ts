import { FastifyPluginAsync } from 'fastify';
import { oracleService } from '../../modules/oracle/oracle.service.js';

const oracleRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/manifesto', async (request, reply) => {
    const { subProjectId, domain } = request.body as { subProjectId: string, domain: string };
    return await oracleService.generateManifesto(subProjectId, domain);
  });

  fastify.post('/audit', async (request, reply) => {
    const auditData = request.body as any;
    return await oracleService.auditActions(auditData);
  });
};

export default oracleRoutes;
