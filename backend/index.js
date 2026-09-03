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
import { protect, adminOnly } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
// Route-specific parser for endpoints requiring large request bodies (e.g., temple creation/update with images)
app.use('/api/temples', express.json({ limit: '10mb' }), express.urlencoded({ extended: true, limit: '10mb' }));

// Global body-parser with smaller safe default for other endpoints
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/circuits', circuitRoutes);
app.use('/api/stats', statsRoutes);

// Seed API endpoint
app.post('/api/seed', protect, adminOnly, async (req, res) => {
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
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large. Please use an image URL instead of uploading a large file.' });
  }
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
