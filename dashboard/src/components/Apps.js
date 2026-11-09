import React from "react";

const apps = [
  { name: "Kite", desc: "Our ultra-fast flagship trading platform with streaming market data, charts and advanced order types." },
  { name: "Console", desc: "The central dashboard for your account, with reports, tax P&L and portfolio insights." },
  { name: "Coin", desc: "Buy direct mutual funds online, commission-free, delivered directly to your account." },
  { name: "Kite Connect", desc: "Build your own trading apps using our APIs for orders, positions and market data." },
  { name: "Varsity", desc: "The largest online stock market education book, free for everyone." },
  { name: "Sentinel", desc: "Create price alerts on stocks and get notified when they trigger." },
];

const Apps = () => {
  return (
    <section className="apps-page">
      <h3 className="title">Apps</h3>
      <div className="apps-grid">
        {apps.map((app) => (
          <article className="app-card" key={app.name}>
            <div className="app-card-heading">
              <h4>{app.name}</h4>
              <span className="app-card-status">Coming soon</span>
            </div>
            <p>{app.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Apps;