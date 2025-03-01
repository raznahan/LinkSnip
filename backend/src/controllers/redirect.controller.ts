import { Request, Response } from 'express';
import Url from '../models/url.model';
import redisClient from '../config/redisClient.config';

export const redirectToLongUrl = async (req: Request, res: Response) => {
  const { slug } = req.params;
  
  // First, check Redis cache
  const cachedUrl = await redisClient.get(slug);
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  try {
    const urlDoc = await Url.findOne({ slug });
    if (urlDoc) {
      // Cache the result for 1 hour (3600 seconds)
      await redisClient.set(slug, urlDoc.longUrl, 'EX', 3600);
      return res.redirect(urlDoc.longUrl);
    }
    return res.status(404).json({ error: 'URL not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
