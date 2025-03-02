import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { AppError, catchAsync } from '../utils/errorHandler.utils';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === 'User already exists') {
      throw new AppError('User already exists', 400);
    }
    throw error;
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginUser({ email, password });
    res.json(user);
  } catch (error: any) {
    throw new AppError('Invalid email or password', 401);
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.getUserProfile(req.user!._id);
    res.json(user);
  } catch (error: any) {
    throw new AppError('User not found', 404);
  }
}); 