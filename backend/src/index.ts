import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from './config/mongo.config';
import urlRoutes from './routes/url.route';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Add this after other middleware
app.use('/api/url', urlRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const startServer = async () => {
  try {
    console.log('Starting application...');
    
    // Connect to MongoDB
    await connectMongo();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the application
startServer();