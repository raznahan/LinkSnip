import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { IUser } from '../models/user.model';

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Use type assertion to handle the _id
      const userId = user._id as unknown as string;
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(userId),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      // Use type assertion to handle the _id
      const userId = user._id as unknown as string;
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(userId),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 