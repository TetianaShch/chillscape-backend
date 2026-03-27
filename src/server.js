import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';

import categoryRoutes from './routes/categoryRoutes.js'; // імпорт роутів категорій

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

await connectMongoDB();
// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use(authRoutes);
app.use(userRoutes);

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// роут для категорій
app.use('/api', categoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// base error handler
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
