import { Router } from 'express';
import { createShortUrl, getUserUrls } from '../controllers/url.controller';
import { protect, optional } from '../middlewares/auth.middleware';

const router = Router();

// Create a short URL (optional authentication)
router.post('/shorten', optional, createShortUrl);

// Get user's URLs (protected route)
router.get('/user', protect, getUserUrls);

export default router;
