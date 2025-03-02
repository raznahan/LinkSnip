import { Request, Response } from 'express';
import redirectService from '../services/redirect.service';
import { AppError, catchAsync } from '../utils/errorHandler.utils';

export const redirectToLongUrl = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  
  const longUrl = await redirectService.getLongUrl(slug);
  
  if (longUrl) {
    res.redirect(longUrl);
    return;
  }
  
  // Redirect to frontend 404 page instead of throwing an error
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  res.redirect(`${frontendUrl}/404`);
});
