import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="/support" style={{ textDecoration: "underline" }}>Track Tickets</a>
      </div>

      <div className="row p-5 m-5">
        <div className="col-6 p-5">
          <h1 className="fs-3 mb-4">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input 
            placeholder="Eg: how do I activate F&O, why is my order getting rejected..." 
            className="mb-4"
          />
          <br />
          <div className="mt-2">
            <a href="/support" className="me-4 text-white">Track account opening</a>
            <a href="/support" className="me-4 text-white">Track segment activation</a>
            <a href="/support" className="me-4 text-white">Intraday margins</a>
            <a href="/support" className="text-white">Kite user manual</a>
          </div>
        </div>

        <div className="col-6 p-5">
          <h1 className="fs-3 mb-4">Featured</h1>
          <ol style={{ lineHeight: "2.5" }}>
            <li>
              <a href="/support" className="text-white">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="/support" className="text-white">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
