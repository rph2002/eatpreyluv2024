import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import Navbar from "../../navbar";
import PageFooter from "../../../components/PageFooter";

function AddDiscountCode() {
  const [code, setCode] = useState("");
  const [discountPercent, setdiscountPercent] = useState("");

  let navigate = useNavigate();

  const handleClick = async (e) => {
    const discountCode = { code, discountPercent };
    console.log(discountCode);
    try {
      await axios.post(
        "http://localhost:8080/discountCodes/add",
        discountCode,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // Handle success here
      console.log("Discount code added successfully!");
      navigate("/admin/view-discount-codes");
    } catch (error) {
      // Handle error here
      console.error("Error adding discount code:", error);
    }
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <label htmlFor="code">Code: </label>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />{" "}
      <br></br>
      <label htmlFor="discountPercent">Discount Percentage: </label>
      <input
        type="number"
        name="discountPercent"
        value={discountPercent}
        onChange={(e) => setdiscountPercent(e.target.value)}
      ></input>
      %<br></br>
      <button onClick={() => navigate("/admin/view-discount-codes")}>
        Back
      </button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default AddDiscountCode;
