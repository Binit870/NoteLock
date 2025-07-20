import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://notelock-password.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api', tokenRoutes); // for /api/verify-token

app.all('*', (req, res) => {
  res.status(404).json({ message: `Can't find ${req.originalUrl} on this server.` });
});

export default app;
