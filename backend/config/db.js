import mongoose from 'mongoose';

const getMongoConnectionString = () =>
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_bharat';

export const isDbConnected = () => mongoose.connection.readyState === 1;

let connectPromise = null;

const connectDB = async () => {
  if (isDbConnected()) {
    return mongoose.connection;
  }

  if (connectPromise) {
    return connectPromise;
  }

  const connStr = getMongoConnectionString();

  connectPromise = mongoose
    .connect(connStr)
    .then((conn) => {
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
      return conn;
    })
    .finally(() => {
      connectPromise = null;
    });

  return connectPromise;
};

export const ensureDbConnection = async () => {
  if (!isDbConnected()) {
    await connectDB();
  }
};

export default connectDB;
