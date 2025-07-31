// Correct content for app.js

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import aiRoutes from './routes/aiRoutes.js';


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
app.use('/api', tokenRoutes);
app.use('/api/ai', aiRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ message: `Can't find ${req.originalUrl} on this server.` });
});

export default app;