import { FastifyPluginAsync } from 'fastify';
import { knowledgeService } from '../../modules/knowledge/knowledge.service.js';
import { meaningSynthesisService } from '../../modules/knowledge/meaningSynthesis.service.js';
import { strategicIntelligenceService } from '../../modules/knowledge/strategicIntelligence.service.js';

const knowledgeRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/synthesize', async (request, reply) => {
    const { facts } = request.body as { facts: any[] };
    return await knowledgeService.synthesizeAbsoluteTruth(facts);
  });

  fastify.post('/ingest', async (request, reply) => {
    const fact = request.body as any;
    return await knowledgeService.ingestFact(fact);
  });

  // Meaning Synthesis: Analyze
  fastify.post('/meaning/analyze', async (request, reply) => {
    return await meaningSynthesisService.synthesizeProjectMeaning();
  });

  // Meaning Synthesis: Alignment
  fastify.get('/meaning/alignment/:proposalId', async (request, reply) => {
    const { proposalId } = request.params as { proposalId: string };
    return await meaningSynthesisService.evaluateMeaningAlignment(proposalId);
  });

  // Strategic Intelligence: Report
  fastify.get('/strategic/report', async (request, reply) => {
    return await strategicIntelligenceService.generateStrategicReport();
  });

  // Strategic Intelligence: Evaluate Proposal
  fastify.post('/strategic/evaluate', async (request, reply) => {
    const proposal = request.body as any;
    return await strategicIntelligenceService.evaluateProposal(proposal);
  });
};

export default knowledgeRoutes;
