import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
      <div className="container p-2 d-flex justify-content-between align-items-center">
        {/* Logo Left */}
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>

        {/* Links Right (Always visible, no toggle/hamburger button) */}
        <div className="d-flex align-items-center">
          <ul className="navbar-nav d-flex flex-row mb-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pricing">
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/support">
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
