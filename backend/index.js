import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import templeRoutes from './routes/templeRoutes.js';
import circuitRoutes from './routes/circuitRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { seedDatabase } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/circuits', circuitRoutes);
app.use('/api/stats', statsRoutes);

// Seed API endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.json({ message: 'Database seeded successfully with authentic Indian temple dataset and admin user.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Root Health Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Travel Bharat API - Centralized Temple Heritage & Pilgrimage Portal Backend',
    status: 'Operational',
    version: '1.0.0',
    documentation: '/api/temples'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    console.warn('[MongoDB Warning] Starting API in limited mode. Admin authentication requires MongoDB connectivity.');
  }

  app.listen(PORT, () => {
    console.log(`[Server] Travel Bharat API server running on http://localhost:${PORT}`);
  });
};

startServer();
