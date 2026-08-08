// Real Discord bot integration using discord.js — same pattern as the
// Office Monitor project's bot, rather than a plain webhook. The bot
// logs in once when the server starts and stays connected, so alerts
// send instantly instead of re-authenticating every time.
import { Client, GatewayIntentBits } from "discord.js";

let client = null;
let readyPromise = null;

const getClient = () => {
  if (client) return { client, readyPromise };

  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error(
      "Discord bot isn't configured yet. Set DISCORD_BOT_TOKEN and DISCORD_ALERT_CHANNEL_ID in .env."
    );
  }

  client = new Client({ intents: [GatewayIntentBits.Guilds] });

  readyPromise = new Promise((resolve) => {
    client.once("ready", () => {
      console.log(`✅ Discord bot logged in as ${client.user.tag}`);
      resolve();
    });
  });

  client.on("error", (err) => {
    console.error("❌ Discord bot connection error:", err.message);
  });

  client.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
    console.error("❌ Discord bot failed to log in:", err.message);
  });

  return { client, readyPromise };
};

// Called once from server.js at startup so the bot connects immediately
// rather than on the first alert request.
export const initDiscordBot = () => {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.log("ℹ️  Discord bot not configured (DISCORD_BOT_TOKEN missing) — skipping.");
    return;
  }
  getClient();
};

// Formats a load-shedding prediction into a real outage-alert message
// (not a generic "this is a test" string) — same shape used for genuine
// automated alerts, so the test button shows exactly what customers
// would actually receive.
export const formatOutageAlertMessage = (prediction) => {
  const {
    name,
    zone,
    riskScore,
    status,
    confidence,
    estimatedWindow,
  } = prediction;

  const statusEmoji = status === "High" ? "🔴" : status === "Medium" ? "🟠" : "🟢";

  const windowLine = estimatedWindow
    ? `🕒 **Estimated window:** ${new Date(estimatedWindow.start).toLocaleTimeString("en-BD", {
        hour: "numeric",
        minute: "2-digit",
      })} – ${new Date(estimatedWindow.end).toLocaleTimeString("en-BD", {
        hour: "numeric",
        minute: "2-digit",
      })} (~${estimatedWindow.durationHours}h)`
    : "🕒 **Estimated window:** Not currently expected";

  return [
    `${statusEmoji} **Load Shedding Alert — ${name}, ${zone}**`,
    `**Risk level:** ${status} (${riskScore}/100)`,
    windowLine,
    `📊 **Prediction confidence:** ${confidence}%`,
    "",
    "Recommend switching to backup power ahead of the window if available. — PowerPredict",
  ].join("\n");
};

export const sendDiscordAlert = async (message) => {
  if (!process.env.DISCORD_ALERT_CHANNEL_ID) {
    throw new Error(
      "Discord alerts aren't configured yet. Set DISCORD_BOT_TOKEN and DISCORD_ALERT_CHANNEL_ID in .env."
    );
  }

  const { readyPromise: waitUntilReady, client: botClient } = getClient();

  await Promise.race([
    waitUntilReady,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Discord bot took too long to connect.")), 10000)
    ),
  ]);

  const channel = await botClient.channels.fetch(process.env.DISCORD_ALERT_CHANNEL_ID);

  if (!channel || !channel.isTextBased()) {
    throw new Error(
      "DISCORD_ALERT_CHANNEL_ID isn't a text channel the bot can see. Check the ID and that the bot has been invited to that server."
    );
  }

  const sent = await channel.send(message);

  return { messageId: sent.id, channelId: channel.id };
};

export default sendDiscordAlert;
