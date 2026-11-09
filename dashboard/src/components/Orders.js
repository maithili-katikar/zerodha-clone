import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { orderVersion } = useContext(GeneralContext);

  useEffect(() => {
    api
      .get("/allOrders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, [orderVersion]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.mode === "BUY" ? "profit" : "loss"}>
                  {order.mode}
                </td>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td>{(order.qty * order.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
