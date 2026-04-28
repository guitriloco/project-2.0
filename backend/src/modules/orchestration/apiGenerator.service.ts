import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface APISpec {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requiredData: string[];
}

export class APIGeneratorService {
  private model = google('gemini-1.5-flash');

  /**
   * Identifies an external service need and generates the corresponding API code.
   */
  async generateAPI(spec: APISpec) {
    console.log(`[API-Gen] Generating ${spec.method} endpoint for ${spec.name} at ${spec.path}...`);

    const prompt = `You are the Self-Generating API Engine for Project 2.0.
    Generate a Fastify route handler in TypeScript based on the following specification.
    
    Spec:
    - Name: ${spec.name}
    - Method: ${spec.method}
    - Path: ${spec.path}
    - Description: ${spec.description}
    - Required Data: ${spec.requiredData.join(', ')}
    
    Ensure the code includes:
    1. Zod schema for validation.
    2. Logic to fetch data from Prisma.
    3. Proper error handling.
    
    Respond with a JSON object:
    {
      code: string,
      validationSchema: string,
      explanation: string,
      riskAssessment: "LOW" | "MEDIUM" | "HIGH"
    }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const apiCode = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'API_GENERATION',
          name: 'API_CODE_SYNTHESIZED',
          payload: {
            spec,
            apiCode
          }
        }
      });

      return apiCode;
    } catch (e) {
      console.error('API generation failed', e);
      return { success: false, error: 'API synthesis failed' };
    }
  }

  /**
   * Scans for external services that might need a connection.
   */
  async scanForIntegrationNeeds() {
    return [
      { service: 'External-Analytics-Sync', reason: 'High volume of un-exported event data', priority: 'MEDIUM' },
      { service: 'Legacy-CRM-Bridge', reason: 'User requested contact synchronization', priority: 'HIGH' },
      { service: 'Autonomous-Billing-Node', reason: 'Preparation for Phase 79 resource multiplication', priority: 'HIGH' }
    ];
  }
}

export const apiGeneratorService = new APIGeneratorService();
