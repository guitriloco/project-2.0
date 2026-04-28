import { Router } from 'express';
import { ResourceProcreationService } from '../../modules/finance/resourceProcreation.service';

export const procreationRouter = Router();
const procreationService = new ResourceProcreationService();

procreationRouter.post('/generate', async (req, res) => {
  const result = await procreationService.procreateCapital();
  res.json(result);
});

procreationRouter.post('/expand', async (req, res) => {
  const result = await procreationService.expandSubstrate();
  res.json(result);
});

procreationRouter.get('/status', async (req, res) => {
  const result = await procreationService.getAbundanceIndex();
  res.json(result);
});
