import { Router } from 'express';
import { createShortUrl, getUserUrls } from '../controllers/url.controller';
import { protect, optional } from '../middlewares/auth.middleware';

const router = Router();

// Create a short URL (optional authentication)
router.post('/shorten', optional, async (req, res) => {
  await createShortUrl(req, res);
});

// Get user's URLs (protected route)
router.get('/user', protect, async (req, res) => {
  await getUserUrls(req, res);
});

export default router;
