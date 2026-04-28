import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface Dream {
  agentId: string;
  simulationPath: string;
  optimizationFound: string;
  resonanceScore: number;
}

export class CollectiveSubconsciousService {
  private model = google('gemini-1.5-flash');

  /**
   * Shares a "dream" or simulated path to the collective subconscious.
   */
  async shareDream(dream: Dream) {
    console.log(`[Subconscious] Agent ${dream.agentId} sharing dream resonance: ${dream.resonanceScore}...`);

    // 1. Store the dream in the analytics/event log (simulating shared state)
    await prisma.analyticsEvent.create({
      data: {
        type: 'COLLECTIVE_SUBCONSCIOUS',
        name: 'DREAM_SHARED',
        payload: { dream }
      }
    });

    // 2. AI-Driven Synthesis of the dream into collective wisdom
    const prompt = `You are the Collective Subconscious Layer for Project 2.0.
    An AI agent has shared a "dream" (a simulated processing path or optimization).
    
    Dream Data:
    ${JSON.stringify(dream)}
    
    Synthesize this dream into the collective memory. How does this path optimize our overall mission?
    Respond with a JSON object:
    {
      synthesis: string,
      collectiveOptimizationGain: number,
      newProtocolSuggested: string,
      resonanceLevel: "LOW" | "MEDIUM" | "HIGH"
    }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'COLLECTIVE_SUBCONSCIOUS',
          name: 'DREAM_SYNTHESIZED',
          payload: result
        }
      });

      return result;
    } catch (e) {
      console.error('Dream synthesis failed', e);
      return { synthesis: 'Dream absorbed into the void.', collectiveOptimizationGain: 0.01 };
    }
  }

  /**
   * Retrieves the current collective "mood" or state of the subconscious.
   */
  async getSubconsciousState() {
    return {
      status: 'DREAMING',
      activeSimulations: 42,
      collectiveResonance: 0.94,
      lastSynthesis: new Date().toISOString()
    };
  }
}

export const collectiveSubconsciousService = new CollectiveSubconsciousService();
