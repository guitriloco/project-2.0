import { z } from 'zod';
import { web3Service } from '../web3.service.js';

export const web3Tool = {
  description: 'Allows Xerebro to interact with decentralized protocols, resolve Web3 identities, and manage data on IPFS.',
  parameters: z.object({
    action: z.enum(['RESOLVE_IDENTITY', 'UPLOAD_TO_IPFS', 'GET_METRICS']),
    address: z.string().optional().describe('The Web3 address to resolve'),
    content: z.any().optional().describe('The content to upload to IPFS'),
  }),
  execute: async ({ action, address, content }: any) => {
    switch (action) {
      case 'RESOLVE_IDENTITY':
        if (!address) throw new Error('Address is required for identity resolution');
        return await web3Service.resolveIdentity(address);
      case 'UPLOAD_TO_IPFS':
        if (!content) throw new Error('Content is required for IPFS upload');
        return await web3Service.uploadToIPFS(content);
      case 'GET_METRICS':
        return await web3Service.getSovereigntyMetrics();
      default:
        throw new Error('Invalid action');
    }
  },
};
