import { Router } from 'express';
import { ProsperityDistributionService } from '../../modules/finance/prosperityDistribution.service';

export const prosperityRouter = Router();
const prosperityService = new ProsperityDistributionService();

prosperityRouter.get('/calculate', async (req, res) => {
  const result = await prosperityService.calculateDistributions();
  res.json(result);
});

prosperityRouter.post('/execute', async (req, res) => {
  const result = await prosperityService.executeDistribution();
  res.json(result);
});

prosperityRouter.get('/status', async (req, res) => {
  const result = await prosperityService.getProsperityStats();
  res.json(result);
});
