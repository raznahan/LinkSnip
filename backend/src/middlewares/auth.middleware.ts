import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { Types } from 'mongoose';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: Types.ObjectId };
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload;

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password') as IUser & { _id: Types.ObjectId };

      if (!req.user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ error: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
    return;
  }
};

export const optional = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload;

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password') as IUser & { _id: Types.ObjectId };
    } catch (error) {
      console.error('Authentication error:', error);
      // Continue without user
    }
  }

  next();
}; 