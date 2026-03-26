import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import locationRoutes from './routes/locationRoutes.js';



dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

await connectMongoDB();
// middleware
app.use(cors());
app.use(express.json());
app.use('/api/locations', locationRoutes);


// test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// base error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
