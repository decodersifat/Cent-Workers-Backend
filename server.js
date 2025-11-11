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

// Root route for health check
app.get('/', (req, res) => {
  res.send({ message: 'Cent Workers API is running!' });
});

app.use('/api/v1/jobs', jobsRoute); 
app.use('/api/v1/category', categoryRoute);

// Connect to DB and start server
async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

startServer();

export default app;
