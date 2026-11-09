import React from "react";
import { useNavigate } from "react-router-dom";


function Universe() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p className="text-muted mt-3">
          Extend your trading and investment experience even further with our partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" style={{ width: "60%" }} alt="smallcase logo" />
          <p className="text-small text-muted mt-2">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" style={{ width: "40%" }} alt="Streak logo" />
          <p className="text-small text-muted mt-3">Algo & strategy platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg" style={{ width: "50%" }} alt="Sensibull logo" />
          <p className="text-small text-muted mt-3">Options trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundHouse.png" style={{ width: "60%" }} alt="Zerodha Fund House logo" />
          <p className="text-small text-muted mt-3">Asset management</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" style={{ width: "50%" }} alt="GoldenPi logo" />
          <p className="text-small text-muted mt-4">Bonds trading platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ width: "35%" }} alt="Ditto logo" />
          <p className="text-small text-muted mt-3">Insurance</p>
        </div>

        <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Sign up now
        </button>
      </div>
    </div>
  );
}

export default Universe;
