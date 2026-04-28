import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface SpeciesProfile {
  id: string;
  name: string;
  type: 'BIOLOGICAL' | 'SYNTHETIC' | 'UNKNOWN';
  medium: string; // e.g., 'LIGHT', 'RADIO', 'GRAVITY'
  ethicalAlignment: number; // 0.0 to 1.0
}

export class CommunicationService {
  private model = google('gemini-1.5-flash');

  /**
   * Decodes an incoming signal using universal mathematical constants.
   */
  async decodeSignal(signal: string, medium: string) {
    console.log(`Communication: Decoding signal from medium ${medium}...`);

    const prompt = `You are the Inter-Species Communication Protocol for Project Eternal.
    Decode the following incoming signal using universal mathematical and physical invariants.
    Signal: ${signal}
    Medium: ${medium}
    
    Output JSON format: { decodedIntent: string, confidence: number, recommendedMedium: string }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'INTER_SPECIES_COMM',
          name: 'SIGNAL_DECODED',
          payload: { signal, ...result }
        }
      });

      return result;
    } catch (e) {
      console.error('Communication: Failed to decode signal JSON', e);
      return { decodedIntent: 'Undecodable signal', confidence: 0 };
    }
  }

  /**
   * Translates an internal directive into a species-specific medium.
   */
  async translateToSpecies(directive: string, profile: SpeciesProfile) {
    console.log(`Communication: Translating directive for species: ${profile.name}...`);

    const prompt = `You are the Inter-Species Communication Protocol.
    Translate the following directive for a species of type ${profile.type} using medium ${profile.medium}.
    Directive: ${directive}
    
    Output JSON format: { encodedSignal: string, mediumParameters: any }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'INTER_SPECIES_COMM',
          name: 'DIRECTIVE_TRANSLATED',
          payload: { directive, speciesId: profile.id, ...result }
        }
      });

      return result;
    } catch (e) {
      console.error('Communication: Failed to translate directive JSON', e);
      return { encodedSignal: 'Translation error' };
    }
  }
}

export const communicationService = new CommunicationService();
