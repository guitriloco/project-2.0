import { Router } from 'express';
import { ValueProliferationService } from '../../modules/finance/valueProliferation.service';

export const valueProliferationRouter = Router();
const valueService = new ValueProliferationService();

valueProliferationRouter.post('/broadcast', async (req, res) => {
  const result = await valueService.broadcastProsperity();
  res.json(result);
});

valueProliferationRouter.post('/route-overflow', async (req, res) => {
  const result = await valueService.routeAbundanceOverflow();
  res.json(result);
});

valueProliferationRouter.get('/status', async (req, res) => {
  const result = await valueService.getProliferationStats();
  res.json(result);
});
