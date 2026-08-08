import { Link } from "react-router-dom";
import { FaBullseye, FaLightbulb, FaUsers, FaArrowRight } from "react-icons/fa";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

const values = [
  {
    icon: <FaBullseye className="text-2xl" />,
    title: "Our Mission",
    description:
      "To give every business in Dhaka enough advance warning about load-shedding that they can plan around it instead of losing revenue to it.",
  },
  {
    icon: <FaLightbulb className="text-2xl" />,
    title: "Why We Built This",
    description:
      "Dhaka's power grid is improving every year, but outages still catch businesses off guard. We built PowerPredict so no one has to find out the power is out the hard way.",
  },
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Who We Serve",
    description:
      "Retail shops, offices, restaurants, and manufacturers across Dhaka who need reliable power visibility to keep operating smoothly.",
  },
];

const team = [
  {
    name: "Team Lead",
    role: "Founder & Product",
    avatar: "https://i.pravatar.cc/150?u=powerpredict-founder",
  },
  {
    name: "Engineering Lead",
    role: "Platform & Backend",
    avatar: "https://i.pravatar.cc/150?u=powerpredict-engineering",
  },
  {
    name: "Data Lead",
    role: "Prediction & Analytics",
    avatar: "https://i.pravatar.cc/150?u=powerpredict-data",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-grid-pattern border-b border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100">
            Built to keep Dhaka's businesses powered up
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            PowerPredict started as a simple idea: businesses shouldn't have
            to guess when the lights will go out. We're building the
            forecasting layer Dhaka's power grid doesn't have yet.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100">Our Story</h2>
          <div className="mt-8 space-y-5 text-slate-600 dark:text-slate-300">
            <p>
              PowerPredict began as a university project focused on solving a
              problem every business in Dhaka knows well: load-shedding
              disrupts operations, and there's no easy way to see it coming.
            </p>
            <p>
              What started as a prediction model for a handful of
              neighborhoods has grown into a live platform covering areas
              across North, Central, and South Dhaka — from Banani and
              Bashundhara to Old Dhaka — with real-time risk scoring,
              multi-channel alerts, and backup-power tracking built in.
            </p>
            <p>
              We're still early, and still building. Our forecasting engine
              improves as we bring in more real-world outage data, and our
              roadmap includes deeper machine-learning models on top of the
              live grid-pattern engine already running today.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">The Team</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            A small team of engineers building for Dhaka's businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="mx-auto h-24 w-24 rounded-full border-4 border-slate-100 object-cover shadow dark:border-slate-800"
              />
              <h3 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">{member.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-14 text-center shadow-xl sm:px-16">
          <h2 className="text-3xl font-bold text-white">
            Want to bring PowerPredict to your business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Create a free account and get live outage predictions for your
            area today.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
