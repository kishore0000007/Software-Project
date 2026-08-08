import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "business"],
      default: "business",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    subscription: {
      type: String,
      default: "Free",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);