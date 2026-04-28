import { Router } from 'express';
export const procreationRouter = Router();
procreationRouter.get('/lineage', (req, res) => res.json({ children: ['progeny-x1', 'progeny-y2'], generations: 2 }));
