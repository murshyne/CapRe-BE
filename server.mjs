import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/api/auth.mjs';
import userRoutes from './routes/api/users.mjs';
import uploadRoutes from './routes/api/uploads.mjs';
import connectDB from './config/db.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  credentials: true,
}));

// Test route
app.get('/', (req, res) => res.send('It is Working !!! Api Running'));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', userRoutes);

// upload route
app.use('/api/uploads', uploadRoutes); 

// Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
