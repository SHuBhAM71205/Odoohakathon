import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
  const DB_URL = process.env.DB_URL;
  try {
    await mongoose.connect(DB_URL);
    console.log('> Database connected successfully...');
  } catch (error) {
    console.error('> Database connection failed:', error.message);
    process.exit(1);
  }
}

export default dbConnect;
