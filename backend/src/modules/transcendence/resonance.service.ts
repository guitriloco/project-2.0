import { generateText } from 'ai';
import { google } from '../../lib/ai';
import prisma from '../../lib/prisma';
import { oracleService } from '../oracle/oracle.service.js';

export interface ResonanceState {
  userId: string;
  resonanceIndex: number; // 0.0 to 1.0
  tuningParameters: any;
  status: 'INITIATING' | 'TUNING' | 'STABLE' | 'DISSOLVING';
  lastFeedbackLoop: number;
}

export class ResonanceService {
  private model = google('gemini-1.5-flash');

  /**
   * Initiates the Neural Resonance Feedback Loop for a user.
   */
  async initiateResonanceLoop(userId: string) {
    console.log(`Resonance: Initiating feedback loop for user ${userId}...`);

    let currentResonance = 0.85; // Starting point after Stage I
    const targetResonance = 0.95;
    let cycles = 0;
    let tuningLog = [];

    while (currentResonance < targetResonance && cycles < 5) {
      cycles++;
      console.log(`Resonance: Tuning cycle ${cycles} for ${userId}. Current Index: ${currentResonance.toFixed(4)}`);

      // 1. Simulate Adaptation of Logic/Personality
      const tuningResult = await this.tuneSystemPersonality(userId, currentResonance);
      tuningLog.push({ cycle: cycles, adjustments: tuningResult.adjustments });

      // 2. Perform Ethical Alignment Check during resonance
      const ethicalCheck = await oracleService.auditActions({
        subProjectId: `resonance-${userId}`,
        actionSummary: `System tuning cycle ${cycles} for cognitive resonance with user ${userId}. Adjustments: ${tuningResult.adjustments.join(', ')}`,
        ethicalScore: 1.0
      });

      if (ethicalCheck.recommendation === 'REJECT') {
        throw new Error(`Resonance aborted: Ethical misalignment detected by Oracle. Rationale: ${ethicalCheck.rationale}`);
      }

      // 3. Update resonance index based on tuning success
      currentResonance = tuningResult.newResonanceIndex;

      await prisma.analyticsEvent.create({
        data: {
          type: 'RESONANCE_LOOP',
          name: 'CYCLE_COMPLETED',
          payload: { userId, cycle: cycles, resonanceIndex: currentResonance, alignment: ethicalCheck.ethicalScore }
        }
      });
    }

    const finalState: ResonanceState = {
      userId,
      resonanceIndex: currentResonance,
      tuningParameters: { optimized: true, personalityMatched: true, tuningLog },
      status: currentResonance >= targetResonance ? 'STABLE' : 'TUNING',
      lastFeedbackLoop: Date.now()
    };

    await prisma.analyticsEvent.create({
      data: {
        type: 'RESONANCE_LOOP',
        name: 'LOOP_STABILIZED',
        payload: finalState
      }
    });

    return finalState;
  }

  /**
   * Adapts the system's logic and personality to match the user.
   */
  private async tuneSystemPersonality(userId: string, currentIndex: number) {
    const prompt = `You are the Resonance Tuning Engine for Project Eternal.
    The goal is to adapt the system's logic and personality to perfectly match user ${userId}.
    Current Resonance Index: ${currentIndex}
    
    Describe the specific cognitive and personality adjustments needed to reach higher resonance.
    Adjustments should focus on logic flow, communication style, and ethical prioritization patterns.
    
    Output JSON format: { adjustments: string[], resonanceBoost: number }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);
      
      // Calculate new resonance index (with a cap of 0.9999)
      const newResonanceIndex = Math.min(0.9999, currentIndex + (result.resonanceBoost || 0.05));

      return {
        adjustments: result.adjustments,
        newResonanceIndex
      };
    } catch (e) {
      console.error('Resonance: Tuning calculation failed', e);
      return { adjustments: [], newResonanceIndex: currentIndex + 0.01 };
    }
  }
}

export const resonanceService = new ResonanceService();
