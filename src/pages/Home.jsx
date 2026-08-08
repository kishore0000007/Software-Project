import { Link } from "react-router-dom";
import {
  FaBolt,
  FaRobot,
  FaMapMarkedAlt,
  FaBatteryFull,
  FaWhatsapp,
  FaChartBar,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const stats = [
  { value: "24+", label: "Dhaka Areas Covered" },
  { value: "60s", label: "Live Refresh Rate" },
  { value: "3", label: "Alert Channels" },
  { value: "24/7", label: "Monitoring" },
];

const features = [
  {
    icon: <FaRobot className="text-2xl" />,
    title: "AI Load-Shedding Prediction",
    description:
      "Get a live risk score for any area in Dhaka, updated continuously from real-time grid demand patterns.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaMapMarkedAlt className="text-2xl" />,
    title: "Area-by-Area Coverage",
    description:
      "From Banani and Bashundhara to Old Dhaka — search any neighborhood and see its current outage risk instantly.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: <FaBatteryFull className="text-2xl" />,
    title: "Backup Power Tracking",
    description:
      "Monitor generator and backup runtime so your team always knows how much buffer you have left.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <FaWhatsapp className="text-2xl" />,
    title: "Multi-Channel Alerts",
    description:
      "Get notified the moment risk rises — over email, SMS, or WhatsApp, whichever your team actually checks.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaChartBar className="text-2xl" />,
    title: "Reports & Analytics",
    description:
      "Track outage trends over time to plan around load-shedding instead of reacting to it.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FaBolt className="text-2xl" />,
    title: "Built for Businesses",
    description:
      "Role-based dashboards for teams and admins, so everyone sees exactly what they need.",
    color: "bg-red-100 text-red-600",
  },
];

const steps = [
  {
    title: "Create your business account",
    description: "Register your company in under a minute — no setup fees, no hardware needed.",
  },
  {
    title: "Add your area",
    description: "Tell us which Dhaka neighborhoods your business operates in.",
  },
  {
    title: "Get live predictions & alerts",
    description: "See real-time risk scores on your dashboard and get notified before outages hit.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-grid-pattern relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <FaBolt className="text-amber-500" />
              Now covering all of Dhaka
            </span>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl dark:text-slate-100">
              Know your next power outage{" "}
              <span className="text-blue-600">before it happens.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              PowerPredict gives Dhaka businesses live, AI-powered load-shedding
              forecasts — down to the neighborhood — so you can plan around
              outages instead of being caught by them.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Get Started Free <FaArrowRight />
              </Link>
              <Link
                to="/about"
                className="rounded-lg border border-slate-300 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" /> No credit card required
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" /> Set up in minutes
              </span>
            </div>
          </div>

          {/* Live-preview style hero card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Live Risk Snapshot</h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Old Dhaka", zone: "South Dhaka", status: "High", score: 81 },
                  { name: "Mirpur", zone: "North Dhaka", status: "Medium", score: 58 },
                  { name: "Banani", zone: "North Dhaka", status: "Low", score: 24 },
                  { name: "Bashundhara R/A", zone: "North Dhaka", status: "Low", score: 20 },
                ].map((area) => (
                  <div
                    key={area.name}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 dark:border-slate-800"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{area.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{area.zone}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        area.status === "High"
                          ? "bg-red-100 text-red-700"
                          : area.status === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {area.status} · {area.score}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
                Illustrative preview — sign in to see live data for your areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Everything you need to stay ahead of load-shedding
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Built specifically for businesses operating in Dhaka's power grid.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">How it works</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Up and running in three simple steps.</p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950 dark:shadow-none dark:ring-1 dark:ring-slate-800">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-14 text-center shadow-xl sm:px-16">
          <h2 className="text-3xl font-bold text-white">
            Stop guessing when the power will go out.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Join businesses across Dhaka already using PowerPredict to plan
            around outages instead of reacting to them.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Create Your Free Account <FaArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
