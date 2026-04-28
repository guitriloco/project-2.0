import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export class GovernanceService {
  private model = google('gemini-1.5-flash');

  /**
   * Autonomously analyzes a proposal and provides a moderation rationale.
   */
  async analyzeProposal(proposalId: string) {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: { creator: true }
    });

    if (!proposal) throw new Error('Proposal not found');

    console.log(`AI Moderation: Analyzing proposal ${proposal.title}...`);

    const prompt = `You are the AI Moderator for Project 2.0 Digital Assembly.
    Analyze the following proposal for technical feasibility, ethical alignment, and strategic value.
    
    Title: ${proposal.title}
    Description: ${proposal.description}
    Creator: ${proposal.creator.name || proposal.creator.email}
    
    Provide a detailed rationale and a recommendation (APPROVE, REJECT, or NEEDS_REVISION).
    
    Output JSON: { rationale: string, recommendation: 'APPROVE' | 'REJECT' | 'NEEDS_REVISION', confidenceScore: number }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const analysis = JSON.parse(jsonStr);

      await prisma.proposal.update({
        where: { id: proposalId },
        data: {
          rationale: analysis.rationale,
          status: analysis.recommendation === 'APPROVE' ? 'ACTIVE' : 'PENDING'
        }
      });

      await prisma.governanceEvent.create({
        data: {
          type: 'PROPOSAL_ANALYZED',
          payload: { proposalId, analysis }
        }
      });

      return analysis;
    } catch (e) {
      console.error('Proposal analysis parsing failed', e);
      return { success: false, error: 'AI analysis failed to parse' };
    }
  }

  /**
   * Casts an autonomous vote on behalf of a system layer.
   */
  async castAutonomousVote(proposalId: string, layer: 'CORE' | 'INFRA' | 'ECONOMIC') {
    // Logic for AI-led voting based on system metrics
    const weight = 10.0; // AI nodes have higher base weight in this prototype
    
    const vote = await prisma.vote.create({
      data: {
        proposalId,
        aiVoter: `ai-node-${layer.toLowerCase()}`, // Virtual AI node
        weight,
        support: true,
      }
    });

    await prisma.governanceEvent.create({
      data: {
        type: 'AUTONOMOUS_VOTE_CAST',
        payload: { proposalId, layer, voteId: vote.id }
      }
    });

    return vote;
  }
  /**
   * Casts a human vote using quadratic voting mechanism.
   * cost = votes^2
   */
  async castHumanVote(proposalId: string, voterId: string, votes: number, support: boolean) {
    const cost = Math.pow(votes, 2);
    
    const user = await prisma.user.findUnique({ where: { id: voterId } });
    if (!user || user.credits < cost) {
      throw new Error('Insufficient governance credits');
    }

    const vote = await prisma.$transaction(async (tx) => {
      // Deduct credits
      await tx.user.update({
        where: { id: voterId },
        data: { credits: { decrement: cost } }
      });

      // Record vote
      return await tx.vote.create({
        data: {
          proposalId,
          voterId,
          weight: votes,
          support
        }
      });
    });

    return vote;
  }

  /**
   * Evaluates if a proposal should pass or fail based on current votes.
   */
  async evaluateProposal(proposalId: string) {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: { votes: true }
    });

    if (!proposal) throw new Error('Proposal not found');

    const totalSupport = proposal.votes
      .filter(v => v.support)
      .reduce((acc, v) => acc + v.weight, 0);
    
    const totalOpposition = proposal.votes
      .filter(v => !v.support)
      .reduce((acc, v) => acc + v.weight, 0);

    const threshold = 50.0; // Simple threshold for prototype

    let newStatus: 'PASSED' | 'REJECTED' = 'REJECTED';
    if (totalSupport > totalOpposition && totalSupport > threshold) {
      newStatus = 'PASSED';
    }

    await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: newStatus }
    });

    return { status: newStatus, totalSupport, totalOpposition };
  }
}

export const governanceService = new GovernanceService();
