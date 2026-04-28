import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export class AbundanceService {
  private model = google('gemini-1.5-flash');

  /**
   * Evaluates the impact of a user request to determine priority in a post-scarcity model.
   */
  async evaluateRequestImpact(userId: string, taskDescription: string) {
    console.log('Abundance Engine: Evaluating ecosystem impact for user request...');

    const evaluation = await generateText({
      model: this.model,
      system: 'You are the Post-Scarcity Resource Allocator. Your goal is to prioritize requests based on ecosystem benefit.',
      prompt: `User Task: "${taskDescription}"
      Predict the Value Return on the ecosystem (0.0 to 1.0) and social impact.
      Output JSON: { impactScore: number, socialImpact: string, recommendation: 'PRIORITY' | 'STANDARD' | 'DEFERRED' }`
    });

    try {
      const jsonStr = evaluation.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'ABUNDANCE_ENGINE',
          name: 'IMPACT_EVALUATION',
          payload: { userId, taskDescription, ...result },
          workspaceId: 'system-abundance'
        }
      });

      return result;
    } catch (e) {
      return { impactScore: 0.5, socialImpact: 'Neutral', recommendation: 'STANDARD' };
    }
  }

  /**
   * Returns current resource abundance metrics.
   */
  async getAbundanceStatus() {
    return {
      status: 'POST_SCARCITY_ACTIVE',
      availableCompute: 'EXAFLOPS',
      storageAbundance: 'INFINITE_TIER',
      globalAccessLevel: 'UNIVERSAL',
      impactGateThreshold: 0.1
    };
  }
}

export const abundanceService = new AbundanceService();
