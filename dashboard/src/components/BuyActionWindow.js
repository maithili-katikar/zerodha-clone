import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode, onOrderPlaced, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");

  const isSell = mode === "SELL";

  const handleOrderClick = async () => {
    setError("");
    try {
      await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: mode,
      });
      onOrderPlaced();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h6 style={{ marginBottom: "10px" }}>
          {isSell ? "Sell" : "Buy"} {uid}
        </h6>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
        {error && (
          <p style={{ color: "#df514c", fontSize: "0.8rem", marginTop: "8px" }}>
            {error}
          </p>
        )}
      </div>

      <div className="buttons">
        <span>
          {isSell ? "Value" : "Margin required"} ₹
          {(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>
        <div>
          <Link
            className="btn btn-blue"
            style={isSell ? { backgroundColor: "#df514c" } : {}}
            onClick={handleOrderClick}
          >
            {isSell ? "Sell" : "Buy"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={onClose}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;