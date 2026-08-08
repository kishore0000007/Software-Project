// Thin fetch wrapper around the PowerPredict backend.
// Set VITE_API_URL in a .env file to point at a different backend
// (defaults to the local dev server on port 5001).
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const getToken = () => localStorage.getItem("token");

const request = async (path, { method = "GET", body, auth = true } = {}) => {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "Couldn't reach the server. Check your connection and that the backend is running."
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body (e.g. 204) — that's fine.
  }

  if (!response.ok) {
    const err = new Error(data?.message || "Something went wrong. Please try again.");
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const authApi = {
  register: (payload) =>
    request("/auth/register", { method: "POST", body: payload, auth: false }),

  login: (payload) =>
    request("/auth/login", { method: "POST", body: payload, auth: false }),

  getProfile: () => request("/auth/profile"),

  updateProfile: (payload) =>
    request("/auth/profile", { method: "PUT", body: payload }),

  changePassword: (payload) =>
    request("/auth/change-password", { method: "PUT", body: payload }),

  updateSubscription: (plan) =>
    request("/auth/subscription", { method: "PUT", body: { plan } }),
};

export const alertsApi = {
  sendWhatsAppTest: (message) =>
    request("/alerts/whatsapp/test", { method: "POST", body: { message } }),

  sendDiscordTest: (message) =>
    request("/alerts/discord/test", { method: "POST", body: { message } }),
};

export const predictionsApi = {
  getAll: (query) =>
    request(`/predictions${query ? `?q=${encodeURIComponent(query)}` : ""}`),

  getOne: (idOrName) => request(`/predictions/${encodeURIComponent(idOrName)}`),
};

export default authApi;
