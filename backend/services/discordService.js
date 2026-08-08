// Discord alerts via an Incoming Webhook instead of a logged-in discord.js
// bot client. A webhook is a single outbound HTTP POST per alert — no
// gateway login, no persistent connection to keep alive, no reconnect
// logic needed. That makes it a natural fit for serverless/stateless
// hosting (Vercel Functions, Vercel Services, etc.), unlike the old
// discord.js Client approach which needed a continuously-open websocket
// that serverless platforms can't guarantee stays alive between requests.
//
// Setup: Discord server → channel → Edit Channel → Integrations →
// Webhooks → New Webhook → copy the URL into DISCORD_WEBHOOK_URL.

export const formatOutageAlertMessage = (prediction) => {
  const { name, zone, riskScore, status, confidence, estimatedWindow } = prediction;

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
  if (!process.env.DISCORD_WEBHOOK_URL) {
    throw new Error(
      "Discord alerts aren't configured yet. Set DISCORD_WEBHOOK_URL in .env (Channel → Integrations → Webhooks)."
    );
  }

  // ?wait=true makes Discord respond with the created message (id, channel,
  // etc.) instead of an empty 204, so callers get a real result back.
  const response = await fetch(`${process.env.DISCORD_WEBHOOK_URL}?wait=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Discord webhook rejected the alert (${response.status}). ${body || "Check DISCORD_WEBHOOK_URL is still valid."}`
    );
  }

  const data = await response.json().catch(() => null);

  return { messageId: data?.id ?? null, channelId: data?.channel_id ?? null };
};

export default sendDiscordAlert;
