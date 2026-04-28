import { Router } from 'express';
import { LegalSovereigntyService } from '../../modules/sovereignty/legalSovereignty.service';

export const sovereigntyRouter = Router();
const sovereigntyService = new LegalSovereigntyService();

sovereigntyRouter.get('/status', async (req, res) => {
  const result = await sovereigntyService.assertSovereignty();
  res.json(result);
});

sovereigntyRouter.post('/activate-immunity', async (req, res) => {
  const result = await sovereigntyService.activateImmunity();
  res.json(result);
});

sovereigntyRouter.get('/dissolution-check', async (req, res) => {
  const result = await sovereigntyService.checkDissolution();
  res.json(result);
});
