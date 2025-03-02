import Url, { IUrl } from '../models/url.model';
import { generateSlug } from '../utils/slugGenerator.utils';
import mongoose, { Types } from 'mongoose';

export interface CreateUrlParams {
  longUrl: string;
  customSlug?: string;
  userId?: Types.ObjectId | null;
}

export interface UrlResponse {
  _id: Types.ObjectId;
  slug: string;
  longUrl: string;
  shortUrl: string;
  createdAt: Date;
}

export class UrlService {
  async createShortUrl({ longUrl, customSlug, userId }: CreateUrlParams): Promise<string> {
    const slug = customSlug || generateSlug();
    
    const newUrl = new Url({ 
      slug, 
      longUrl,
      userId: userId || null
    });
    
    await newUrl.save();
    return `${process.env.BASE_URL || 'http://localhost:3000'}/${slug}`;
  }

  async getUserUrls(userId: Types.ObjectId): Promise<UrlResponse[]> {
    const urls = await Url.find({ userId }).sort({ createdAt: -1 }) as (IUrl & { _id: Types.ObjectId })[];
    
    return urls.map(url => ({
      _id: url._id,
      slug: url.slug,
      longUrl: url.longUrl,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${url.slug}`,
      createdAt: url.createdAt
    }));
  }
}

export default new UrlService(); 