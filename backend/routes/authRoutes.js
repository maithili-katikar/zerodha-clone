const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const { requireAuth } = require("../middleware/authMiddleware");
// const { HoldingsModel } = require("../model/HoldingsModel");
// const { PositionsModel } = require("../model/PositionsModel");
const { validate } = require("../middleware/validate");
const { signupSchema, loginSchema } = require("../validators/schemas");

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashed });

    // const starterHoldings = [
    //   { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
    //   { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%" },
    //   { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
    // ];
    // await HoldingsModel.insertMany(
    //   starterHoldings.map((h) => ({ ...h, userId: user._id }))
    // );

    // await PositionsModel.insertMany([
    //   { userId: user._id, product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
    //   { userId: user._id, product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    // ]);

    res.cookie("token", createToken(user), cookieOptions);
    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.cookie("token", createToken(user), cookieOptions);
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});

module.exports = router;