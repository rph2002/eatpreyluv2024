import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  const location = useLocation();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav>
      <ul id="NavbarList">
        <div id="NavbarName">
          {location.pathname === "/home" && <h1>Welcome {user.fName}!</h1>}
        </div>
        <div id="ButtonsList">
          <button className="NavButton" onClick={() => navigate("/home")}>
            Home
          </button>
          <button
            className="NavButton"
            onClick={() => navigate("/shopping-cart")}
          >
            Shopping Cart
          </button>
          <button className="NavButton" onClick={() => navigate("/orders")}>
            Orders
          </button>
          <button className="NavButton" onClick={() => navigate("/settings")}>
            Settings
          </button>
          <button
            className="NavButton"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
          {user.admin && (
            <button className="NavButton" onClick={() => navigate("/admin")}>
              Admin
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
