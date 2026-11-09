import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import axios, { all } from "axios";
import api from "../api";
import { VerticalGraph } from "./VerticalGraph";
import { calcHoldingsSummary, formatMoney } from "./calc";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { orderVersion } = useContext(GeneralContext);
    useEffect(() => {
    api
      .get("/allHoldings")
      .then((res) => setAllHoldings(res.data))
      .catch(() => {});
  }, [orderVersion]);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);
  const { investment, currentValue, pnl, pnlPercent } =
  calcHoldingsSummary(allHoldings);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatMoney(investment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatMoney(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {formatMoney(pnl)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
