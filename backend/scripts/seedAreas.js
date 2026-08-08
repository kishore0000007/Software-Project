// Seeds the areas the prediction engine covers.
// baseRiskFactor is an illustrative placeholder (0 = very stable grid,
// 1 = historically outage-prone) — not sourced from real DESCO/DPDC
// outage records. Swap these for real historical-outage-derived values
// once that data is available.
//
// Usage: node scripts/seedAreas.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Area from "../models/Area.js";

dotenv.config();

const areas = [
  { name: "Banani", zone: "North Dhaka", lat: 23.7937, lng: 90.4066, baseRiskFactor: 0.25 },
  { name: "Bashundhara R/A", zone: "North Dhaka", lat: 23.8151, lng: 90.4322, baseRiskFactor: 0.2 },
  { name: "Gulshan", zone: "North Dhaka", lat: 23.7925, lng: 90.4078, baseRiskFactor: 0.22 },
  { name: "Baridhara", zone: "North Dhaka", lat: 23.8023, lng: 90.4176, baseRiskFactor: 0.24 },
  { name: "Uttara", zone: "North Dhaka", lat: 23.8759, lng: 90.3795, baseRiskFactor: 0.35 },
  { name: "Nikunja", zone: "North Dhaka", lat: 23.8258, lng: 90.4084, baseRiskFactor: 0.3 },
  { name: "Mirpur", zone: "North Dhaka", lat: 23.8223, lng: 90.3654, baseRiskFactor: 0.55 },
  { name: "Mohammadpur", zone: "Central Dhaka", lat: 23.7657, lng: 90.3588, baseRiskFactor: 0.5 },
  { name: "Dhanmondi", zone: "Central Dhaka", lat: 23.7461, lng: 90.3742, baseRiskFactor: 0.3 },
  { name: "Adabor", zone: "Central Dhaka", lat: 23.7692, lng: 90.3554, baseRiskFactor: 0.45 },
  { name: "Shyamoli", zone: "Central Dhaka", lat: 23.7712, lng: 90.3654, baseRiskFactor: 0.4 },
  { name: "Farmgate", zone: "Central Dhaka", lat: 23.7574, lng: 90.3888, baseRiskFactor: 0.42 },
  { name: "Tejgaon", zone: "Central Dhaka", lat: 23.7654, lng: 90.3931, baseRiskFactor: 0.48 },
  { name: "Malibagh", zone: "Central Dhaka", lat: 23.7469, lng: 90.4128, baseRiskFactor: 0.45 },
  { name: "Rampura", zone: "Central Dhaka", lat: 23.7594, lng: 90.4218, baseRiskFactor: 0.4 },
  { name: "Badda", zone: "Central Dhaka", lat: 23.7808, lng: 90.4265, baseRiskFactor: 0.5 },
  { name: "Khilgaon", zone: "Central Dhaka", lat: 23.7443, lng: 90.4271, baseRiskFactor: 0.46 },
  { name: "Motijheel", zone: "South Dhaka", lat: 23.7331, lng: 90.4172, baseRiskFactor: 0.38 },
  { name: "Shantinagar", zone: "South Dhaka", lat: 23.7398, lng: 90.4155, baseRiskFactor: 0.37 },
  { name: "Wari", zone: "South Dhaka", lat: 23.72, lng: 90.4165, baseRiskFactor: 0.55 },
  { name: "Old Dhaka (Puran Dhaka)", zone: "South Dhaka", lat: 23.7104, lng: 90.4074, baseRiskFactor: 0.65 },
  { name: "Lalbagh", zone: "South Dhaka", lat: 23.7188, lng: 90.3888, baseRiskFactor: 0.6 },
  { name: "Hazaribagh", zone: "South Dhaka", lat: 23.7273, lng: 90.3701, baseRiskFactor: 0.58 },
  { name: "Jatrabari", zone: "South Dhaka", lat: 23.7104, lng: 90.4331, baseRiskFactor: 0.6 },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let created = 0;
  let skipped = 0;

  for (const area of areas) {
    const existing = await Area.findOne({ name: area.name });
    if (existing) {
      skipped += 1;
      continue;
    }
    await Area.create(area);
    created += 1;
  }

  console.log(`✅ Areas seeded: ${created} created, ${skipped} already existed.`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Failed to seed areas");
  console.error(err);
  process.exit(1);
});
