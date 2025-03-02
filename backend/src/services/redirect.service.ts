import Url from '../models/url.model';
import redisClient from '../config/redisClient.config';

export class RedirectService {
  async getLongUrl(slug: string): Promise<string | null> {
    const cachedUrl = await redisClient.get(slug);
    if (cachedUrl) {
      return cachedUrl;
    }

    const urlDoc = await Url.findOne({ slug });
    if (urlDoc) {
      await redisClient.set(slug, urlDoc.longUrl, 'EX', 3600);
      return urlDoc.longUrl;
    }
    
    return null;
  }
}

export default new RedirectService(); 