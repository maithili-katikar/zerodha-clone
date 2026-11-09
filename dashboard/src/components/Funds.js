import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useUser } from "./UserContext";
import GeneralContext from "./GeneralContext";
import { calcHoldingsSummary, formatMoney } from "./calc";

const Funds = () => {
  const { user } = useUser();
  const { orderVersion } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    api
      .get("/allHoldings")
      .then((res) => setHoldings(res.data))
      .catch(() => {});
  }, [orderVersion]);

  const { investment } = calcHoldingsSummary(holdings);
  const available = user ? user.balance : 0;

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formatMoney(available)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatMoney(investment)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatMoney(available)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening balance</p>
              <p>{formatMoney(available + investment)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{formatMoney(100000)}</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>{formatMoney(investment)}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;