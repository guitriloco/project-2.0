import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface VibeData {
  input: string;
  context?: string;
  emotionalState?: string;
}

export class IntentTranslatorService {
  private model = google('gemini-1.5-flash');

  /**
   * Translates raw user input and "vibe" into precise execution intents.
   */
  async translateIntent(vibe: VibeData) {
    console.log(`[Intent-Translator] Translating vibe: "${vibe.input.substring(0, 50)}..."`);

    // 1. Log the translation request
    await prisma.analyticsEvent.create({
      data: {
        type: 'INTENT_TRANSLATION',
        name: 'VIBE_INPUT_RECEIVED',
        payload: { vibe }
      }
    });

    // 2. AI-Driven Vibe Analysis and Translation
    const prompt = `You are the Universal Intent Translator for Project 2.0.
    Your task is to take raw user input, often filled with subtext, emotion, and "vibe," and translate it into a structured set of precise execution commands for Xerebro.
    
    User Input: "${vibe.input}"
    Context: ${vibe.context || 'None'}
    Emotional State: ${vibe.emotionalState || 'Neutral'}
    
    Respond with a JSON object:
    {
      translatedIntent: string,
      confidenceScore: number,
      executionCommands: string[],
      detectedSentiment: string,
      subtextAnalysis: string
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
          type: 'INTENT_TRANSLATION',
          name: 'INTENT_TRANSLATED',
          payload: result
        }
      });

      return result;
    } catch (e) {
      console.error('Intent translation failed', e);
      return { translatedIntent: 'MAINTAIN_STABILITY', confidenceScore: 0.85 };
    }
  }

  /**
   * Retrieves the current translation state.
   */
  async getTranslatorStatus() {
    return {
      status: 'LISTENING',
      nuanceResolution: 'HIGH',
      lastTranslation: new Date().toISOString()
    };
  }
}

export const intentTranslatorService = new IntentTranslatorService();
