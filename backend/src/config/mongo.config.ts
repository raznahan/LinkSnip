import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    console.log('==== MONGODB: Connecting to MongoDB... ====');
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener';
    console.log(`Using MongoDB URI: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('==== MONGODB: Connected to MongoDB ====');
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

export default connectMongo;
