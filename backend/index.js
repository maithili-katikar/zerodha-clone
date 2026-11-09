require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");
const { validate } = require("./middleware/validate");
const { orderSchema } = require("./validators/schemas");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get("/allHoldings", requireAuth, async (req, res) => {
  const holdings = await HoldingsModel.find({ userId: req.user.id });
  res.json(holdings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  const positions = await PositionsModel.find({ userId: req.user.id });
  res.json(positions);
});

app.get("/allOrders", requireAuth, async (req, res) => {
  const orders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

app.post("/newOrder", requireAuth, validate(orderSchema), async (req, res) => {
  try {
    const name = req.body.name;
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = req.body.mode;

    if (!name || !qty || qty <= 0 || !Number.isInteger(qty)) {
      return res.status(400).json({ message: "Quantity must be a whole number above 0" });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ message: "Price must be above 0" });
    }
    if (mode !== "BUY" && mode !== "SELL") {
      return res.status(400).json({ message: "Invalid order mode" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cost = qty * price;

    const holding = await HoldingsModel.findOne({
      userId: req.user.id,
      name: name,
    });

    if (mode === "BUY") {
      if (user.balance < cost) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          userId: req.user.id,
          name: name,
          qty: qty,
          avg: price,
          price: price,
          net: "0.00%",
          day: "0.00%",
        });
      }

      user.balance = user.balance - cost;
      await user.save();
    }

    if (mode === "SELL") {
      if (!holding || holding.qty < qty) {
        return res.status(400).json({
          message: "You cannot sell more shares than you own",
        });
      }

      holding.qty = holding.qty - qty;
      holding.price = price;
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      user.balance = user.balance + cost;
      await user.save();
    }

    const order = await OrdersModel.create({
      userId: req.user.id,
      name: name,
      qty: qty,
      price: price,
      mode: mode,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB started!");
    app.listen(PORT, () => console.log("App started on port " + PORT));
  })
  .catch((err) => console.error("DB connection failed:", err));