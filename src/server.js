import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
// / Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
// / Middlewares
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

await connectMongoDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', categoryRoutes);

// ! Routes

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/categories', categoryRoutes);

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// error handling middlewares
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
