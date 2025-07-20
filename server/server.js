import dotenv from 'dotenv';
// 👇 This is the correct place. It runs before any other app file is imported.
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

// Now that variables are loaded, we can connect to the database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});