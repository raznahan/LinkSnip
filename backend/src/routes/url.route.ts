import { Router } from 'express';
import { createShortUrl } from '../controllers/url.controller';

const router = Router();

router.post('/shorten', async (req, res) => {
  await createShortUrl(req, res);
});

export default router;
