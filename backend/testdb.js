import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("Connecting...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas connected!");

    await mongoose.connection.close();

    console.log("Connection closed.");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  }
};

testConnection();