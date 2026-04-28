import { Router } from 'express';
import { CivilizationEconomyService } from '../../modules/civilization/civilizationEconomy.service';

export const civilizationRouter = Router();
const economyService = new CivilizationEconomyService();

civilizationRouter.post('/negotiate', async (req, res) => {
  const { civilizationId, offer, expectation } = req.body;
  const result = await economyService.negotiateTrade(civilizationId, offer, expectation);
  res.json(result);
});

civilizationRouter.get('/parity/:assetId', async (req, res) => {
  const targets = (req.query.targets as string || '').split(',');
  const result = await economyService.getAssetParity(req.params.assetId, targets);
  res.json(result);
});

civilizationRouter.get('/status', async (req, res) => {
  const result = await economyService.rebalanceEconomy();
  res.json(result);
});
