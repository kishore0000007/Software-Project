import twilio from "twilio";

let client = null;

const getClient = () => {
  if (client) return client;

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    throw new Error(
      "WhatsApp alerts aren't configured yet. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM in .env."
    );
  }

  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client;
};

// Normalizes a stored phone number (e.g. "+8801700000000" or "01700000000")
// into Twilio's "whatsapp:+<countrycode><number>" format. Adjust
// defaultCountryCode if your users aren't primarily in Bangladesh.
export const toWhatsAppAddress = (phone, defaultCountryCode = "88") => {
  if (!phone) return null;

  const digits = phone.replace(/[^\d]/g, "");
  if (!digits) return null;

  const withCountryCode = digits.startsWith(defaultCountryCode)
    ? digits
    : `${defaultCountryCode}${digits.replace(/^0+/, "")}`;

  return `whatsapp:+${withCountryCode}`;
};

export const sendWhatsAppAlert = async (toPhone, message) => {
  const to = toWhatsAppAddress(toPhone);

  if (!to) {
    throw new Error("No valid phone number on file to send a WhatsApp alert to.");
  }

  const twilioClient = getClient();

  const result = await twilioClient.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to,
    body: message,
  });

  return { sid: result.sid, status: result.status, to };
};

export default sendWhatsAppAlert;
