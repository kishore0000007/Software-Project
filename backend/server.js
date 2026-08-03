 import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();

const app = express();
app.get("/db-test", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();

    res.json({
      success: true,
      message: "MongoDB Connected"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
  }
};

startServer();