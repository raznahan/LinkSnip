import { Request, Response } from 'express';
import Url from '../models/url.model';
import { generateSlug } from '../utils/slugGenerator.utils';

export const createShortUrl = async (req: Request, res: Response) => {
  const { longUrl, customSlug } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: 'Long URL is required' });
  }

  let slug = customSlug || generateSlug();

  try {
    const newUrl = new Url({ slug, longUrl });
    await newUrl.save();
    return res.status(201).json({ shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${slug}` });
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate key error from MongoDB
      return res.status(409).json({ error: 'Custom slug is already taken' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
