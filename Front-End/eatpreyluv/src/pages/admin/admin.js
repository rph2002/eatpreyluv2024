import React from "react";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import PageFooter from "../../components/PageFooter";
import "./admin.css";

function Admin() {
  let navigate = useNavigate();

  return (
    <div>
      <PageHeader />
      <Navbar />
      <h1 className="TitleHeader">Admin</h1>
      <button onClick={() => navigate("/admin/view-users")}>View Users</button>
      <br></br>
      <button onClick={() => navigate("/admin/view-items")}>View Items</button>
      <br></br>
      <button onClick={() => navigate("/admin/view-orders")}>
        View Orders
      </button>
      <br></br>
      <button onClick={() => navigate("/admin/view-discount-codes")}>
        View Discount Codes
      </button>
      <br></br>
      <button onClick={() => navigate("/admin/view-payments")}>
        View Payments
      </button>
      <br></br>
      <button onClick={() => navigate("/admin/view-images")}>
        View Images
      </button>
      <br></br>
    </div>
  );
}

export default Admin;
