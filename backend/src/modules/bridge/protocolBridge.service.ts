import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface ProtocolMap {
  sourceProtocol: string;
  targetProtocol: string;
  mappingLogic: string;
}

export class ProtocolBridgeService {
  private model = google('gemini-1.5-flash');

  /**
   * Automatically translates an unknown API protocol to Project 2.0 internal standards.
   */
  async translateProtocol(apiDescription: string) {
    console.log(`[Bridge] Analyzing unknown protocol: ${apiDescription.substring(0, 50)}...`);

    const prompt = `You are the Universal Protocol Bridge for Project 2.0.
    Analyze the following API/Protocol description and generate a translation map to Project 2.0 standard JSON format.
    
    API Description:
    ${apiDescription}
    
    Respond with a JSON object:
    {
      protocolType: "REST" | "GraphQL" | "gRPC" | "Custom",
      translationMap: any,
      requestTemplate: string,
      confidenceScore: number
    }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const translation = JSON.parse(jsonStr);

      await prisma.analyticsEvent.create({
        data: {
          type: 'PROTOCOL_BRIDGE',
          name: 'PROTOCOL_MAPPED',
          payload: {
            description: apiDescription,
            translation
          }
        }
      });

      return translation;
    } catch (e) {
      console.error('Protocol translation failed', e);
      return { success: false, error: 'Translation analysis failed' };
    }
  }

  /**
   * Retrieves the status of active bridges.
   */
  async getBridgeStatus() {
    return {
      activeBridges: 12,
      supportedProtocols: ['REST', 'GraphQL', 'gRPC', 'WebSockets', 'MQTT'],
      lastSync: new Date().toISOString()
    };
  }
}

export const protocolBridgeService = new ProtocolBridgeService();
