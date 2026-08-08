import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  sendTestWhatsAppAlert,
  sendWhatsAppAlertToNumber,
  sendTestDiscordAlert,
} from "../controllers/alertController.js";

const router = express.Router();

// Alert sending is an admin-only action — customers see their subscription
// and services on their own dashboard, not alert controls.
router.post("/whatsapp/test", authMiddleware, roleMiddleware("admin"), sendTestWhatsAppAlert);
router.post("/discord/test", authMiddleware, roleMiddleware("admin"), sendTestDiscordAlert);

router.post(
  "/whatsapp/send",
  authMiddleware,
  roleMiddleware("admin"),
  sendWhatsAppAlertToNumber
);

export default router;
