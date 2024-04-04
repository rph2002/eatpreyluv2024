import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import Navbar from "../../navbar";
import PageFooter from "../../../components/PageFooter";

function AddPayment() {
  const [customer_id, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [customer, setCustomer] = useState(null);

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:8080/customers/get/${customer_id}`
      );
      setCustomer(result.data);
      const newPayment = {
        customer: { id: result.data.id },
        name,
        cardType,
        cardNumber,
        expirationDate,
        securityCode,
      };
      // Handle success here
      console.log("Customer data:", result.data);
      try {
        await axios.post("http://localhost:8080/payments/add", newPayment, {
          headers: { "Content-Type": "application/json" },
        });
        // Handle success here
        console.log("Payment added successfully!");
        navigate("/admin/view-payments");
      } catch (error) {
        // Handle error here
        console.error("Error adding order:", error);
      }
    } catch (error) {
      // Handle error here
      console.error("Error getting customer:", error);
    }
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <label htmlFor="customer_id">Customer ID: </label>
      <input
        type="text"
        name="customer_id"
        defaultValue={customer_id}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <br></br>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="cardType">Card Type: </label>
      <input
        type="text"
        name="cardType"
        value={cardType}
        onChange={(e) => setCardType(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="cardNumber">Card Number: </label>
      <input
        type="text"
        name="cardNumber"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="expirationDate">Expiration Date: </label>
      <input
        type="text"
        name="expirationDate"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="securityCode">Security Code: </label>
      <input
        type="text"
        name="securityCode"
        value={securityCode}
        onChange={(e) => setSecurityCode(e.target.value)}
      ></input>
      <br></br>
      <button onClick={() => navigate("/admin/view-payments")}>Back</button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default AddPayment;
