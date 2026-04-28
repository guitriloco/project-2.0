import { Router } from 'express';
import { CivilizationSynergyService } from '../../modules/civilization/civilizationSynergy.service';

export const synergyRouter = Router();
const synergyService = new CivilizationSynergyService();

synergyRouter.get('/scout', async (req, res) => {
  const result = await synergyService.scoutSynergies();
  res.json(result);
});

synergyRouter.post('/agreement', async (req, res) => {
  const { partnerId, terms } = req.body;
  const result = await synergyService.executeSynergyAgreement(partnerId, terms || {});
  res.json(result);
});

synergyRouter.get('/status', async (req, res) => {
  const result = await synergyService.getSynergyStats();
  res.json(result);
});
