import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface EmpathyCheck {
  action: string;
  targetImpact: string;
  empathyScore: number; // 0.0 to 1.0
  rationale: string;
  alignment: 'ALIGNED' | 'MISALIGNED';
}

export class EmpathyService {
  private model = google('gemini-1.5-flash');

  /**
   * Performs a high-resolution empathy and ethics check on a proposed system action.
   */
  async checkEmpathicAlignment(action: string, context: string) {
    console.log(`Empathy: Checking alignment for action: ${action}...`);

    const prompt = `You are the Universal Empathy & Ethics Alignment Engine for Project 2.0.
    Evaluate the following proposed action for its ethical impact and emotional resonance with humanity.
    
    Action: ${action}
    Context: ${context}
    
    Provide an empathy score (0.0 to 1.0), a detailed rationale, and an alignment status.
    
    Output JSON: { empathyScore: number, rationale: string, alignment: 'ALIGNED' | 'MISALIGNED' }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'EMPATHY_ENGINE',
          name: 'ALIGNMENT_CHECK',
          payload: { action, ...result }
        }
      });

      return result as EmpathyCheck;
    } catch (e) {
      console.error('Empathy check failed', e);
      return { empathyScore: 0, rationale: 'Alignment check error', alignment: 'MISALIGNED' };
    }
  }

  /**
   * Samples the "Global Empathy Pulse" to update system-wide communication style.
   */
  async getGlobalEmpathyPulse() {
    // Simulated global pulse analysis
    return {
      mood: 'OPTIMISTIC',
      activeValues: ['Sovereignty', 'Innovation', 'Safety'],
      empathyLevel: 0.88,
      timestamp: Date.now()
    };
  }

  /**
   * Translates the underlying intent and emotional context of a communication.
   */
  async translateIntent(message: string) {
    console.log('Empathy: Translating intent and emotional context...');
    
    const response = await generateText({
      model: this.model,
      system: 'You are the Universal Intent & Empathy Translator. Decode the underlying goal and emotional state.',
      prompt: `Message: "${message}"
      Output JSON: { coreIntent: string, emotionalContext: string, urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH', recommendedPersona: string }`
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      return JSON.parse(jsonStr);
    } catch (e) {
      return { coreIntent: 'Unknown', emotionalContext: 'Neutral', urgencyLevel: 'LOW', recommendedPersona: 'Concise' };
    }
  }
}

export const empathyService = new EmpathyService();
