// Creates (or confirms) a single admin account for the platform.
// Public registration always creates "business" accounts — this script
// is the only way to provision an "admin" account, on purpose.
//
// Usage:
//   node scripts/seedAdmin.js
//   ADMIN_EMAIL=you@company.com ADMIN_PASSWORD=SomethingStrong123 node scripts/seedAdmin.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const email = (process.env.ADMIN_EMAIL || "admin@powerpredict.com").toLowerCase();
  const plainPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  const existing = await User.findOne({ email });

  if (existing) {
    console.log(`Admin account already exists: ${email}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await User.create({
    companyName: "PowerPredict Admin",
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`✅ Admin account created`);
  console.log(`   email:    ${email}`);
  console.log(`   password: ${plainPassword}`);
  console.log(`   Change this password after first login.`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Failed to seed admin account");
  console.error(err);
  process.exit(1);
});
