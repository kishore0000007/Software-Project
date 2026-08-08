import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    zone: {
      type: String,
      required: true, // e.g. "North Dhaka", "South Dhaka", "Central Dhaka"
    },

    lat: Number,
    lng: Number,

    // 0 (very stable grid) - 1 (historically outage-prone).
    // Illustrative baseline used by the prediction engine, not sourced
    // from real DESCO/DPDC outage records.
    baseRiskFactor: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Area", areaSchema);
