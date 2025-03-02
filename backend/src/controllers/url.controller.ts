import { Request, Response } from 'express';
import urlService from '../services/url.service';
import { AppError, catchAsync } from '../utils/errorHandler.utils';

export const createShortUrl = catchAsync(async (req: Request, res: Response) => {
  const { longUrl, customSlug } = req.body;
  
  if (!longUrl) {
    throw new AppError('Long URL is required', 400);
  }

  try {
    const userId = req.user?._id;
    const shortUrl = await urlService.createShortUrl({ longUrl, customSlug, userId });
    
    res.status(201).json({ shortUrl });
  } catch (error: any) {
    if (error.code === 11000) {
      throw new AppError('Custom slug is already taken', 409);
    }
    throw error;
  }
});

export const getUserUrls = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }
  const urls = await urlService.getUserUrls(userId);
  
  res.status(200).json(urls);
});
