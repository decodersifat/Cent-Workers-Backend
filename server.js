import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRoute from './Routes/jobs.route.js';
import connectDB from './config/db.js';
import categoryRoute from './Routes/category.route.js'

dotenv.config();


const app = express()
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Cent Workers API is running!',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/v1/jobs', jobsRoute); 
app.use('/api/v1/category', categoryRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect to DB and start server
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

// Only run startServer in non-serverless environments
if (process.env.VERCEL !== '1') {
  startServer();
}

export default app;
