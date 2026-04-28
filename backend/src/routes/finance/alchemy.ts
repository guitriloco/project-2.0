import { Router } from 'express';
import { ResourceAlchemyService } from '../../modules/finance/resourceAlchemy.service';

export const alchemyRouter = Router();
const alchemyService = new ResourceAlchemyService();

alchemyRouter.post('/transmute', async (req, res) => {
  const { dataId, valueEstimate } = req.body;
  const result = await alchemyService.transmuteDataToCapital(dataId, valueEstimate);
  res.json(result);
});

alchemyRouter.get('/stats', async (req, res) => {
  const result = await alchemyService.getAlchemicalStats();
  res.json(result);
});

alchemyRouter.post('/synthesize-equity', async (req, res) => {
  const { cycles } = req.body;
  const result = await alchemyService.synthesizeComputeEquity(cycles);
  res.json(result);
});
