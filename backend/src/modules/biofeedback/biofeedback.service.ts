import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface BiometricData {
  heartRate: number;
  focusLevel: number; // 0.0 to 1.0
  stressLevel: number; // 0.0 to 1.0
  timestamp: number;
}

export class BioFeedbackService {
  private model = google('gemini-1.5-flash');

  /**
   * Processes incoming biometric data and triggers system adaptations.
   */
  async processBioData(data: BiometricData) {
    console.log(`[Bio-Feedback] Processing biometric signal: HR=${data.heartRate}, Focus=${data.focusLevel}, Stress=${data.stressLevel}`);

    // 1. Log the biometric event for historical analysis
    await prisma.analyticsEvent.create({
      data: {
        type: 'BIO_FEEDBACK_SIGNAL',
        name: 'BIOMETRIC_UPDATE',
        payload: data
      }
    });

    // 2. AI-Driven Adaptation Logic
    const prompt = `You are the Bio-Feedback Adaptive Layer for Project 2.0.
    Analyze the following biometric data and determine the necessary system adaptations to optimize user performance and wellbeing.
    
    Data:
    - Heart Rate: ${data.heartRate} bpm
    - Focus Level: ${data.focusLevel}
    - Stress Level: ${data.stressLevel}
    
    Respond with a JSON object:
    {
      adaptation: "CALM" | "BOOST" | "NEUTRAL",
      actions: string[],
      uiThemeOverride?: string,
      notificationPriority: "LOW" | "NORMAL" | "HIGH",
      logic: string
    }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const adaptation = JSON.parse(jsonStr);

      // 3. Store the adaptation decision
      await prisma.analyticsEvent.create({
        data: {
          type: 'BIO_FEEDBACK_ADAPTATION',
          name: 'SYSTEM_ADAPTED',
          payload: adaptation
        }
      });

      return adaptation;
    } catch (e) {
      console.error('Bio-feedback adaptation failed', e);
      return { adaptation: 'NEUTRAL', actions: ['Maintain standard operating parameters'], logic: 'Analysis failed' };
    }
  }

  /**
   * Returns the current cognitive state based on recent signals.
   */
  async getCognitiveState() {
    const recentSignals = await prisma.analyticsEvent.findMany({
      where: { type: 'BIO_FEEDBACK_SIGNAL' },
      orderBy: { timestamp: 'desc' },
      take: 5
    });

    if (recentSignals.length === 0) {
      return { status: 'UNKNOWN', focus: 0.5, stress: 0.5 };
    }

    // Average the levels for simplicity in this phase
    const avgFocus = recentSignals.reduce((acc, s) => acc + (s.payload as any).focusLevel, 0) / recentSignals.length;
    const avgStress = recentSignals.reduce((acc, s) => acc + (s.payload as any).stressLevel, 0) / recentSignals.length;

    return {
      status: avgStress > 0.7 ? 'STRESSED' : avgFocus > 0.8 ? 'DEEP_WORK' : 'STABLE',
      focus: avgFocus,
      stress: avgStress,
      lastUpdate: recentSignals[0].timestamp
    };
  }
}

export const bioFeedbackService = new BioFeedbackService();
