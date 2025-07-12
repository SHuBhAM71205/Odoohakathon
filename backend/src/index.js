import app from './app.js';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`> Server is running on port ${PORT}...`);
  });
};

startServer();