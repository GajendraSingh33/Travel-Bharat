import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_bharat';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    console.warn(`[MongoDB Warning] Continuing with in-memory/fallback mode for offline development.`);
  }
};

export default connectDB;
