import { generateText } from 'ai';
import { google } from '../../lib/ai';
import prisma from '../../lib/prisma';

export interface EthicalAudit {
  subProjectId: string;
  actionSummary: string;
  ethicalScore: number; // 0.0 to 1.0
  recommendation: 'APPROVE' | 'WARNING' | 'REJECT';
  rationale: string;
}

export class OracleService {
  private model = google('gemini-1.5-flash');

  /**
   * Generates a unique ethical manifesto for a new sub-project.
   */
  async generateManifesto(subProjectId: string, domain: string) {
    console.log(`Oracle: Generating ethical manifesto for ${subProjectId} in domain ${domain}...`);

    const prompt = `You are the Universal Ethical Oracle for Project Eternal.
    Create a detailed ethical manifesto for a new autonomous sub-project.
    Sub-Project ID: ${subProjectId}
    Domain: ${domain}
    The manifesto must align with the core principles: Benevolence, Agency, and Truth.
    Output JSON format: { manifesto: string, keyDirectives: string[] }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'ETHICAL_ORACLE',
          name: 'MANIFESTO_GENERATED',
          payload: { subProjectId, domain, ...result }
        }
      });

      return result;
    } catch (e) {
      console.error('Oracle: Failed to parse manifesto JSON', e);
      return { manifesto: 'Error generating manifesto', keyDirectives: [] };
    }
  }

  /**
   * Audits a series of actions from a sub-project.
   */
  async auditActions(audit: Omit<EthicalAudit, 'recommendation' | 'rationale'>): Promise<EthicalAudit> {
    console.log(`Oracle: Auditing actions for ${audit.subProjectId}...`);

    const prompt = `You are the Universal Ethical Oracle.
    Audit the following actions for sub-project ${audit.subProjectId}.
    Actions: ${audit.actionSummary}
    Initial Score: ${audit.ethicalScore}
    Analyze the actions against the Project Eternal Ethical Core.
    Provide a final recommendation (APPROVE, WARNING, REJECT) and a detailed rationale.
    Output JSON format: { recommendation: 'APPROVE' | 'WARNING' | 'REJECT', rationale: string, adjustedScore: number }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'ETHICAL_ORACLE',
          name: 'ACTION_AUDITED',
          payload: { ...audit, ...result }
        }
      });

      return {
        ...audit,
        recommendation: result.recommendation,
        rationale: result.rationale,
        ethicalScore: result.adjustedScore
      };
    } catch (e) {
      console.error('Oracle: Failed to parse audit JSON', e);
      return { ...audit, recommendation: 'WARNING', rationale: 'Audit parsing error' };
    }
  }

  /**
   * Validates a neural handshake signature for ethical alignment.
   */
  async validateNeuralHandshake(userId: string, neuralSignature: string): Promise<{
    valid: boolean;
    alignmentScore: number;
    rationale: string;
  }> {
    console.log(`Oracle: Validating neural handshake for ${userId}...`);
    
    const prompt = `You are the Universal Ethical Oracle.
    Validate the following neural handshake for user ${userId}.
    Neural Signature: ${neuralSignature}
    Analyze the signature for ethical alignment with Project Eternal.
    The signature is a high-dimensional representation of the user's intent and identity.
    Provide a validity status, an alignment score (0.0 to 1.0), and a rationale.
    Output JSON format: { valid: boolean, alignmentScore: number, rationale: string }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const result = JSON.parse(jsonStr);
      
      await prisma.analyticsEvent.create({
        data: {
          type: 'ETHICAL_ORACLE',
          name: 'HANDSHAKE_VALIDATED',
          payload: { userId, neuralSignature, ...result }
        }
      });

      return result;
    } catch (e) {
      console.error('Oracle: Failed to parse handshake validation JSON', e);
      return { valid: false, alignmentScore: 0, rationale: 'Validation processing error' };
    }
  }
}

export const oracleService = new OracleService();
