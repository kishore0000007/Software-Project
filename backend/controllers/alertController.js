import User from "../models/User.js";
import Area from "../models/Area.js";
import { sendWhatsAppAlert } from "../services/whatsappService.js";
import { sendDiscordAlert, formatOutageAlertMessage } from "../services/discordService.js";
import { generateAreaPrediction } from "../services/predictionEngine.js";

// Sends a WhatsApp alert to the logged-in user's own phone number.
// Used by the "Send Test WhatsApp Alert" button and can be called from
// anywhere else in the backend (e.g. once the prediction engine exists)
// by importing sendWhatsAppAlert directly.
export const sendTestWhatsAppAlert = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.phone) {
      return res.status(400).json({
        success: false,
        message: "Add a phone number to your profile first.",
      });
    }

    const message =
      req.body?.message ||
      `PowerPredict Alert: This is a test notification for ${user.companyName}. Your WhatsApp alerts are working.`;

    const result = await sendWhatsAppAlert(user.phone, message);

    res.status(200).json({
      success: true,
      message: "WhatsApp alert sent.",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sends a Discord alert to the configured channel. Unlike WhatsApp this
// isn't per-user — it posts to whichever channel the bot is configured
// for (typically an internal ops/alerts channel), so no phone number is
// needed. Instead of a generic "this is a test" string, it builds a real
// outage-alert message from the current highest-risk area's live
// prediction, so the button shows exactly what customers actually get.
export const sendTestDiscordAlert = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let message = req.body?.message;

    if (!message) {
      const areas = await Area.find();

      if (areas.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No areas seeded yet — run the seed script before sending alerts.",
        });
      }

      const now = new Date();
      const topPrediction = areas
        .map((area) => generateAreaPrediction(area, now))
        .sort((a, b) => b.riskScore - a.riskScore)[0];

      message = formatOutageAlertMessage(topPrediction);
    }

    const result = await sendDiscordAlert(message);

    res.status(200).json({
      success: true,
      message: "Discord alert sent.",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sends a WhatsApp alert to an arbitrary phone number. Restricted to
// admins so it can't be used to spam arbitrary numbers.
export const sendWhatsAppAlertToNumber = async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({
        success: false,
        message: "phone and message are required.",
      });
    }

    const result = await sendWhatsAppAlert(phone, message);

    res.status(200).json({
      success: true,
      message: "WhatsApp alert sent.",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
