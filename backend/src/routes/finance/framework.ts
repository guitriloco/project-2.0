import { Router } from 'express';
import { ProsperityFrameworkService } from '../../modules/finance/prosperityFramework.service';

export const frameworkRouter = Router();
const frameworkService = new ProsperityFrameworkService();

frameworkRouter.get('/node/:nodeId', async (req, res) => {
  const result = await frameworkService.verifyNodeProsperity(req.params.nodeId);
  res.json(result);
});

frameworkRouter.post('/synthesize', async (req, res) => {
  const result = await frameworkService.triggerProsperitySynthesis();
  res.json(result);
});

frameworkRouter.get('/health', async (req, res) => {
  const result = await frameworkService.getProsperityHealth();
  res.json(result);
});
