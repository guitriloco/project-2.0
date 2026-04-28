import { Router } from 'express';
import { CulturalPreservationService } from '../../modules/culture/culturalPreservation.service';

export const preservationRouter = Router();
const preservationService = new CulturalPreservationService();

preservationRouter.get('/discover', async (req, res) => {
  const result = await preservationService.identifyArtifacts();
  res.json(result);
});

preservationRouter.post('/archive', async (req, res) => {
  const result = await preservationService.preserveArtifact(req.body);
  res.json(result);
});

preservationRouter.get('/status', async (req, res) => {
  const result = await preservationService.getArchivalStats();
  res.json(result);
});
