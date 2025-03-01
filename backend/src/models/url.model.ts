import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  slug: string;
  longUrl: string;
  createdAt: Date;
  userId?: string;
}

const UrlSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String }
});

export default mongoose.model<IUrl>('Url', UrlSchema);
