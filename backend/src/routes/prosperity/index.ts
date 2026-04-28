import { Router } from 'express';
import { ProsperityEngineService } from '../../modules/finance/prosperityEngine.service';

export const prosperityRouter = Router();
const prosperityService = new ProsperityEngineService();

prosperityRouter.get('/scout', async (req, res) => {
  const result = await prosperityService.scoutEconomicVoids();
  res.json(result);
});

prosperityRouter.post('/seed', async (req, res) => {
  const result = await prosperityService.seedEconomy(req.body);
  res.json(result);
});

prosperityRouter.get('/index', async (req, res) => {
  const result = await prosperityService.getProsperityIndex();
  res.json(result);
});
