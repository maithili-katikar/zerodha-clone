import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { useUser } from "./UserContext";
import GeneralContext from "./GeneralContext";
import { calcHoldingsSummary, formatMoney } from "./calc";

const Summary = () => {
  const { user } = useUser();
  const { orderVersion } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    api
      .get("/allHoldings")
      .then((res) => setHoldings(res.data))
      .catch(() => {});
  }, [orderVersion]);

  const { investment, currentValue, pnl, pnlPercent } =
    calcHoldingsSummary(holdings);
  const balance = user ? user.balance : 0;
  const pnlClass = pnl >= 0 ? "profit" : "loss";

  return (
    <>
      <div className="username">
        <h6>
          Hi, <span>{user ? user.name : ""}</span>!
        </h6>
        <p>Your portfolio overview at a glance.</p>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>
        <div className="data">
          <div className="first">
            <h3>{formatMoney(balance)}</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>{formatMoney(investment)}</span>
            </p>
            <p>
              Opening balance <span>{formatMoney(balance + investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>
        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {formatMoney(pnl)}{" "}
              <small>{pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value <span>{formatMoney(currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatMoney(investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
