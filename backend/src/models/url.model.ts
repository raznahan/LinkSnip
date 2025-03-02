import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUrl extends Document {
  slug: string;
  longUrl: string;
  createdAt: Date;
  userId: Types.ObjectId;
}

const UrlSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IUrl>('Url', UrlSchema);
