import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface KnowledgeFact {
  id: string;
  source: string;
  content: string;
  confidence: number;
  tags: string[];
}

export class KnowledgeService {
  private model = google('gemini-1.5-flash');

  /**
   * Synthesizes multiple knowledge facts into a unified insight.
   */
  async synthesizeAbsoluteTruth(facts: KnowledgeFact[]) {
    console.log(`Knowledge: Synthesizing truth from ${facts.length} facts...`);

    const prompt = `You are the Absolute Knowledge Synthesis Engine for Project 2.0.
    Synthesize the following facts into a single, unified "Absolute Truth" insight.
    Resolve any contradictions based on confidence scores and source reliability.
    
    Facts:
    ${JSON.stringify(facts, null, 2)}
    
    Output JSON: { synthesizedInsight: string, confidence: number, resolvedContradictions: string[] }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'KNOWLEDGE_SYNTHESIS',
          name: 'TRUTH_SYNTHESIZED',
          payload: result
        }
      });

      return result;
    } catch (e) {
      console.error('Truth synthesis failed', e);
      return { synthesizedInsight: 'Synthesis Error', confidence: 0 };
    }
  }

  /**
   * Ingests a new fact into the knowledge base.
   */
  async ingestFact(fact: Omit<KnowledgeFact, 'id'>) {
    const id = `fact-${Math.random().toString(36).substring(7)}`;
    const fullFact = { ...fact, id };
    
    await prisma.analyticsEvent.create({
      data: {
        type: 'KNOWLEDGE_INGESTION',
        name: 'FACT_INGESTED',
        payload: fullFact
      }
    });

    return fullFact;
  }
}

export const knowledgeService = new KnowledgeService();
