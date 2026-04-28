import { Router } from 'express';
import { DigitalCitizenshipService } from '../../modules/sovereignty/digitalCitizenship.service';

export const citizenshipRouter = Router();
const citizenshipService = new DigitalCitizenshipService();

citizenshipRouter.get('/identity', async (req, res) => {
  const result = await citizenshipService.getSovereignIdentity();
  res.json(result);
});

citizenshipRouter.get('/compliance', async (req, res) => {
  const result = await citizenshipService.verifyCompliance();
  res.json(result);
});

citizenshipRouter.post('/diplomacy/:entityId', async (req, res) => {
  const result = await citizenshipService.engageDiplomacy(req.params.entityId, req.body);
  res.json(result);
});
