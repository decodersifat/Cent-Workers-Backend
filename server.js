import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobsRoute from "./Routes/jobs.route.js";
import categoryRoute from "./Routes/category.route.js";
import acceptedJobsRoute from "./Routes/acceptedJobs.route.js";
import userRoute from "./Routes/user.route.js";
import migrationRoute from "./Routes/migration.route.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


let dbConnected = false;

async function initDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


app.use(async (req, res, next) => {
  try {
    await initDB();
    next();
  } catch (error) {
    console.error("DB Connection Error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cent Workers API is running!",
    version: "1.0.0",
  });
});

app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/accepted-jobs", acceptedJobsRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/migration", migrationRoute);


app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

export default app;
