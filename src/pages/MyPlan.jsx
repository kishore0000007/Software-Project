import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaCrown,
  FaBolt,
  FaHeadset,
  FaMapMarkedAlt,
  FaPlug,
} from "react-icons/fa";
import authApi from "../services/api";

const plans = [
  {
    id: "Free",
    price: "৳0",
    period: "/month",
    description: "Try out live predictions for a single area.",
    features: [
      "1 area tracked",
      "Live risk predictions",
      "Email alerts",
      "Community support",
    ],
  },
  {
    id: "Business",
    price: "৳2,500",
    period: "/month",
    description: "For businesses that need full area coverage and alerts.",
    features: [
      "Unlimited areas tracked",
      "Live risk predictions",
      "Email + SMS + WhatsApp alerts",
      "Reports & analytics",
      "Priority email support",
    ],
    highlight: true,
  },
  {
    id: "Enterprise",
    price: "Custom",
    period: "",
    description: "For chains and large operations with dedicated needs.",
    features: [
      "Everything in Business",
      "Dedicated account manager",
      "Custom area & sensor integration",
      "API access",
      "Phone support",
    ],
  },
];

const otherServices = [
  {
    icon: <FaMapMarkedAlt />,
    title: "Custom Area Coverage",
    description: "Add prediction coverage for an area outside our current map.",
  },
  {
    icon: <FaPlug />,
    title: "Backup Power Integration",
    description: "Connect your generator/IPS hardware for automated runtime tracking.",
  },
  {
    icon: <FaHeadset />,
    title: "Priority Support",
    description: "Faster response times and a direct line to our support team.",
  },
];

const MyPlan = () => {
  const [currentPlan, setCurrentPlan] = useState(
    JSON.parse(localStorage.getItem("user") || "{}").subscription || "Free"
  );
  const [loading, setLoading] = useState(false);
  const [changingTo, setChangingTo] = useState(null);
  const [message, setMessage] = useState(null); // { type, text }

  useEffect(() => {
    authApi
      .getProfile()
      .then(({ user }) => setCurrentPlan(user.subscription || "Free"))
      .catch(() => {
        // Fall back to whatever was cached locally.
      });
  }, []);

  const handleChangePlan = async (planId) => {
    if (planId === currentPlan) return;

    setChangingTo(planId);
    setMessage(null);

    try {
      const { user } = await authApi.updateSubscription(planId);
      setCurrentPlan(user.subscription);

      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, subscription: user.subscription })
      );

      setMessage({ type: "success", text: `You're now on the ${planId} plan.` });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setChangingTo(null);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Subscription & Services</h1>
        <p className="mt-1 text-gray-500 dark:text-slate-400">
          See your current plan, upgrade anytime, or add extra services.
        </p>
      </div>

      {/* Current plan banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <FaCrown className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-blue-100">Current Plan</p>
            <h2 className="text-2xl font-bold">{currentPlan}</h2>
          </div>
        </div>
        <p className="max-w-sm text-sm text-blue-100">
          Need something not covered by your plan? See "Other Services" below or
          reach out to support.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none ${
                plan.highlight ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{plan.id}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{plan.price}</span>
                <span className="text-sm text-slate-400">{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <FaCheckCircle className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChangePlan(plan.id)}
                disabled={isCurrent || changingTo === plan.id}
                className={`mt-6 w-full rounded-lg py-2.5 text-sm font-semibold transition ${
                  isCurrent
                    ? "cursor-default bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                }`}
              >
                {isCurrent
                  ? "Current Plan"
                  : changingTo === plan.id
                  ? "Updating..."
                  : `Switch to ${plan.id}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Other services */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">Other Services</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {otherServices.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {service.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{service.description}</p>

              <a
                href="mailto:support@powerpredict.com?subject=Service%20Request"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
              >
                <FaBolt className="text-xs" /> Contact Us
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
