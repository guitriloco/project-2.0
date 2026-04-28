import { generateText } from 'ai';
import { google } from '../../lib/ai.js';
import prisma from '../../lib/prisma.js';

export interface AgentMessage {
  from: string;
  to: string;
  content: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  context?: any;
}

export class CollaborationService {
  private model = google('gemini-1.5-flash');

  /**
   * Routes a message between agents and determines next steps using AI.
   */
  async routeMessage(message: AgentMessage) {
    console.log(`[Collaboration] Agent ${message.from} -> ${message.to}: ${message.content.substring(0, 50)}...`);

    // 1. Log the communication
    await prisma.analyticsEvent.create({
      data: {
        type: 'AGENT_COLLABORATION',
        name: 'MESSAGE_ROUTED',
        payload: message
      }
    });

    // 2. AI-Driven Coordination Logic
    const prompt = `You are the Multi-Agent Coordination Layer for Project 2.0.
    An agent has sent a message to another. Analyze the intent and determine if further delegation or synchronization is needed.
    
    Message:
    From: ${message.from}
    To: ${message.to}
    Content: ${message.content}
    Context: ${JSON.stringify(message.context || {})}
    
    Respond with a JSON object:
    {
      action: "DELEGATE" | "SYNCHRONIZE" | "ACKNOWLEDGE",
      nextAgent?: string,
      instruction?: string,
      coordinationScore: number
    }`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    try {
      const jsonStr = response.text.match(/\{[\s\S]*\}/)?.[0] || '{}';
      const coordination = JSON.parse(jsonStr);

      // 3. Store coordination result
      await prisma.analyticsEvent.create({
        data: {
          type: 'AGENT_COLLABORATION',
          name: 'COORDINATION_RESULT',
          payload: {
            originalMessageId: message.from + Date.now(),
            coordination
          }
        }
      });

      return coordination;
    } catch (e) {
      console.error('Agent coordination failed', e);
      return { action: 'ACKNOWLEDGE', coordinationScore: 0 };
    }
  }

  /**
   * Synchronizes the task board across agents.
   */
  async synchronizeTasks() {
    const activeTasks = await prisma.task.findMany({
      where: { status: 'in-progress' }
    });

    console.log(`[Collaboration] Synchronizing ${activeTasks.length} active tasks across agent swarm...`);

    // Trigger AI analysis of bottlenecks
    const prompt = `Analyze the current project backlog and identify potential synchronization bottlenecks between agents.
    
    Backlog:
    ${JSON.stringify(activeTasks)}
    
    Identify agents that need to collaborate more closely to resolve dependencies.`;

    const response = await generateText({
      model: this.model,
      prompt,
    });

    return {
      syncTimestamp: new Date().toISOString(),
      analysis: response.text,
      taskCount: activeTasks.length
    };
  }
}

export const collaborationService = new CollaborationService();
