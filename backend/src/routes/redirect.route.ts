import { Router } from 'express';
import { redirectToLongUrl } from '../controllers/redirect.controller';

const router = Router();

router.get('/:slug', async (req, res) => {
  await redirectToLongUrl(req, res);
});

export default router;
