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
    // Associate URL with user if authenticated
    const userId = req.user?._id;
    
    const newUrl = new Url({ 
      slug, 
      longUrl,
      userId: userId || null
    });
    
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

export const getUserUrls = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const urls = await Url.find({ userId }).sort({ createdAt: -1 });
    
    // Format the URLs for the response
    const formattedUrls = urls.map(url => ({
      _id: url._id,
      slug: url.slug,
      longUrl: url.longUrl,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${url.slug}`,
      createdAt: url.createdAt
    }));
    
    return res.status(200).json(formattedUrls);
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
