import { Router } from 'express';
import { CulturalSynthesisService } from '../../modules/culture/culturalSynthesis.service';

export const cultureRouter = Router();
const culturalService = new CulturalSynthesisService();

cultureRouter.get('/trends/:region', async (req, res) => {
  const result = await culturalService.analyzeCulturalTrends(req.params.region);
  res.json(result);
});

cultureRouter.post('/audit', async (req, res) => {
  const { content, contexts } = req.body;
  const result = await culturalService.auditCulturalSensitivity(content, contexts);
  res.json(result);
});

cultureRouter.get('/status', async (req, res) => {
  const result = await culturalService.synthesizeCulturalKnowledge();
  res.json(result);
});
