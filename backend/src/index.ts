import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from './config/mongo.config';
import urlRoutes from './routes/url.route';
import authRoutes from './routes/auth.route';
import redirectRoutes from './routes/redirect.route';
import { errorHandler } from './utils/errorHandler.utils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/url', urlRoutes);
app.use('/api/auth', authRoutes);
app.use('/', redirectRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('URL Shortener API');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongo();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start the application
startServer();