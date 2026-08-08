import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import { initDiscordBot } from "./services/discordService.js";

dotenv.config();

const app = express();

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

app.get("/db-test", async (req, res) => {
  try {
    const mongoose = (await import("mongoose")).default;
    await mongoose.connection.db.admin().ping();

    res.json({
      success: true,
      message: "MongoDB Connected",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/predictions", predictionRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Doesn't block server startup — the bot connects in the background,
    // and sendDiscordAlert waits for it if a request comes in before it's ready.
    initDiscordBot();

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
  }
};

startServer();
