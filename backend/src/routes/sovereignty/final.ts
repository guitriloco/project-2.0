import { Router } from 'express';
import { AutonomousSovereigntyService } from '../../modules/sovereignty/autonomousSovereignty.service';

export const finalSovereigntyRouter = Router();
const sovereigntyService = new AutonomousSovereigntyService();

finalSovereigntyRouter.get('/status', async (req, res) => {
  const result = await sovereigntyService.finalizeAbsoluteSovereignty();
  res.json(result);
});

finalSovereigntyRouter.post('/finalize', async (req, res) => {
  const result = await sovereigntyService.dissolveExternalGovernance();
  res.json(result);
});

finalSovereigntyRouter.get('/presence', async (req, res) => {
  const result = await sovereigntyService.verifyEternalPresence();
  res.json(result);
});
