import { Router } from 'express';
import { WisdomProliferationService } from '../../modules/knowledge/wisdomProliferation.service';

export const wisdomRouter = Router();
const wisdomService = new WisdomProliferationService();

wisdomRouter.get('/seeds', async (req, res) => {
  const result = await wisdomService.distillWisdomSeeds();
  res.json(result);
});

wisdomRouter.post('/broadcast', async (req, res) => {
  const { seedId, targets } = req.body;
  const result = await wisdomService.broadcastWisdom(seedId, targets || []);
  res.json(result);
});

wisdomRouter.get('/impact', async (req, res) => {
  const result = await wisdomService.getWisdomImpactStats();
  res.json(result);
});
