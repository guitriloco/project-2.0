import { FastifyPluginAsync } from 'fastify';
import { governanceService } from '../../modules/governance/governance.service.js';
import { legalDefenseService } from '../../modules/governance/legalDefense.service.js';
import { legalPersonalityService } from '../../modules/governance/legalPersonality.service.js';
import { estateManager } from '../../modules/finance/estateManager.service.js';
import { heritagePreserverService } from '../../modules/governance/heritagePreserver.service.js';
import prisma from '../../lib/prisma.js';

const governanceRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Proposals
  fastify.get('/proposals', async (request, reply) => {
    return await prisma.proposal.findMany({
      include: { creator: true, _count: { select: { votes: true } } }
    });
  });

  fastify.get('/proposals/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.proposal.findUnique({
      where: { id },
      include: { creator: true, votes: true }
    });
  });

  fastify.post('/proposals', async (request, reply) => {
    const { title, description, creatorId } = request.body as any;
    const proposal = await prisma.proposal.create({
      data: { title, description, creatorId }
    });
    // Trigger AI moderation automatically
    await governanceService.analyzeProposal(proposal.id);
    return proposal;
  });

  // Moderation
  fastify.post('/proposals/:id/analyze', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await governanceService.analyzeProposal(id);
  });

  // Voting
  fastify.post('/proposals/:id/vote', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { voterId, votes, support } = request.body as any;
    return await governanceService.castHumanVote(id, voterId, votes, support);
  });

  fastify.post('/proposals/:id/evaluate', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await governanceService.evaluateProposal(id);
  });

  fastify.post('/proposals/:id/autonomous-vote', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { layer } = request.body as { layer: 'CORE' | 'INFRA' | 'ECONOMIC' };
    return await governanceService.castAutonomousVote(id, layer);
  });

  // Legal Defense: Scan
  fastify.get('/legal/scan', async (request, reply) => {
    return await legalDefenseService.scanLegalLandscape();
  });

  // Legal Defense: Update Document
  fastify.post('/legal/update-doc', async (request, reply) => {
    const { docType, requirements } = request.body as { docType: string; requirements: string };
    if (!docType || !requirements) {
      return reply.code(400).send({ error: 'docType and requirements are required' });
    }
    return await legalDefenseService.updateLegalDocument(docType, requirements);
  });

  // Legal Personality: Sign
  fastify.post('/legal/sign', async (request, reply) => {
    const { docId, rationale } = request.body as { docId: string; rationale: string };
    if (!docId || !rationale) {
      return reply.code(400).send({ error: 'docId and rationale are required' });
    }
    return await legalPersonalityService.signSovereignDocument(docId, rationale);
  });

  // Legal Personality: Scout IP
  fastify.get('/legal/scout-ip', async (request, reply) => {
    return await legalPersonalityService.scoutPatentableIP();
  });

  // Digital Estate: Scout Assets
  fastify.get('/estate/scout', async (request, reply) => {
    return await estateManager.scoutAssets();
  });

  // Digital Estate: Lifecycle
  fastify.post('/estate/manage/:assetId', async (request, reply) => {
    const { assetId } = request.params as { assetId: string };
    return await estateManager.manageAssetLifecycle(assetId);
  });

  // Digital Estate: Brand Monitor
  fastify.get('/estate/brand-monitor', async (request, reply) => {
    return await estateManager.monitorBrandSovereignty();
  });

  // Heritage: Archive
  fastify.post('/heritage/archive', async (request, reply) => {
    return await heritagePreserverService.archiveProjectWisdom();
  });

  // Heritage: Status
  fastify.get('/heritage/status', async (request, reply) => {
    return await heritagePreserverService.getHeritageStatus();
  });

  // Events
  fastify.get('/events', async (request, reply) => {
    return await prisma.governanceEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  });
};

export default governanceRoutes;
