import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllPredictions, getAreaPrediction } from "../controllers/predictionController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllPredictions);
router.get("/:id", authMiddleware, getAreaPrediction);

export default router;
