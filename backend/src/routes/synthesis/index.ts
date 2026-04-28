import { Router } from 'express';
export const synthesisRouter = Router();
synthesisRouter.get('/status', (req, res) => res.json({ synthesisRate: '1.2 KNOW/hr', totalValue: '450.5 EQ' }));
