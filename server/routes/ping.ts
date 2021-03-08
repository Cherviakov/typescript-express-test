import { Router, Request, Response } from 'express';

const router = Router();

router.head('/', (req:Request, res:Response) => {
  res.set('X-PONG', 'pong');
  res.status(200).end();
});

export default router;
