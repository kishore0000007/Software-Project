import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      companyName: user.companyName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const sanitizeUser = (user) => ({
  id: user._id,
  companyName: user.companyName,
  email: user.email,
  role: user.role,
  subscription: user.subscription,
  phone: user.phone,
  address: user.address,
  avatar: user.avatar,
});

export const register = async (req, res) => {
  try {
    const { companyName, email, password, phone, address } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Company name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Public registration always creates a "business" account.
    // Admin accounts are provisioned separately (see scripts/seedAdmin.js)
    // so a client can never grant itself admin access.
    const user = await User.create({
      companyName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      address,
    });

    const token = signToken(user);

    res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = signToken(user);

    res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { companyName, email, phone, address, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (companyName) user.companyName = companyName;
    if (email) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const VALID_PLANS = ["Free", "Business", "Enterprise"];

// Lets a business self-select a plan. There's no payment gateway wired up
// yet, so this just records the chosen tier — swap this for a real
// checkout flow (Stripe/SSLCommerz/etc.) before charging anyone for real.
export const updateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!VALID_PLANS.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: `Plan must be one of: ${VALID_PLANS.join(", ")}.`,
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.subscription = plan;
    await user.save();

    res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
