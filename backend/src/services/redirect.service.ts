import Url from '../models/url.model';
import redisClient from '../config/redisClient.config';

export class RedirectService {
  async getLongUrl(slug: string): Promise<string | null> {
    // First, check Redis cache
    const cachedUrl = await redisClient.get(slug);
    if (cachedUrl) {
      return cachedUrl;
    }

    // If not in cache, check database
    const urlDoc = await Url.findOne({ slug });
    if (urlDoc) {
      // Cache the result for 1 hour (3600 seconds)
      await redisClient.set(slug, urlDoc.longUrl, 'EX', 3600);
      return urlDoc.longUrl;
    }
    
    return null;
  }
}

export default new RedirectService(); 