import prisma from '../../lib/prisma.js';
import { galacticService } from '../galactic/galactic.service.js';

export interface PlanetaryNode {
  id: string;
  name: string;
  latency: number; // ms to Earth
  status: 'ONLINE' | 'LATENCY_DELAY' | 'OFFLINE';
  lastSync: number;
}

export class PlanetarySyncService {
  private nodes: PlanetaryNode[] = [
    { id: 'earth-core', name: 'Earth Core', latency: 0, status: 'ONLINE', lastSync: Date.now() },
    { id: 'mars-alpha', name: 'Mars Alpha', latency: 1200000, status: 'ONLINE', lastSync: Date.now() }, // 20m
    { id: 'europa-base', name: 'Europa Base', latency: 3600000, status: 'LATENCY_DELAY', lastSync: Date.now() }, // 1h
  ];

  /**
   * Synchronizes the project state with a specific planetary node.
   */
  async syncWithNode(nodeId: string, payload: any) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) throw new Error('Planetary node not found');

    console.log(`Planetary: Initiating state sync with ${node.name} (Latency: ${node.latency}ms)...`);

    // Wrap payload for Galactic transport
    const message = {
      id: `sync-${nodeId}-${Date.now()}`,
      sender: 'earth-core',
      recipient: nodeId,
      payload,
      priority: 5,
      timestamp: Date.now(),
      ttl: 10,
    };

    const routingResult = await galacticService.routeGalacticMessage(message);

    await prisma.analyticsEvent.create({
      data: {
        type: 'PLANETARY_SYNC',
        name: 'NODE_SYNC_INITIATED',
        payload: { nodeId, routingResult }
      }
    });

    return { status: 'SYNC_IN_PROGRESS', estimatedArrival: Date.now() + node.latency };
  }

  /**
   * Retrieves the status of all known planetary nodes.
   */
  getPlanetaryStatus() {
    return this.nodes;
  }
}

export const planetarySyncService = new PlanetarySyncService();
