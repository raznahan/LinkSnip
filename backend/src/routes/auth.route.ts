import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  await registerUser(req, res);
});

// Login user
router.post('/login', async (req, res) => {
  await loginUser(req, res);
});

// Get user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  await getUserProfile(req, res);
});

export default router; 