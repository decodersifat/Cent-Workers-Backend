import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http"; // 👈 add this
import jobsRoute from "../Routes/jobs.route.js";
import categoryRoute from "../Routes/category.route.js";
import connectDB from "../config/db.js";

dotenv.config();

const app = express();

connectDB();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cent Workers API is running!",
    version: "1.0.0",
  });
});


app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/category", categoryRoute);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export const handler = serverless(app);
