import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRoute from './Routes/jobs.route.js';
import connectDB from './config/db.js';
import categoryRoute from './Routes/category.route.js'

dotenv.config();


const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
connectDB();
app.use('/api/v1/jobs', jobsRoute); 
app.use('/api/v1/category', categoryRoute);


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
