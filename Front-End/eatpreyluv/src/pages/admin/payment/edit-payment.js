import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";
import Navbar from "../../navbar";

function EditPayment() {
  const { id } = useParams();

  const [curPayment, setCurPayment] = useState([]);

  const [customer_id, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [customer, setCustomer] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const loadPayment = async () => {
      const result = await axios.get(
        `http://localhost:8080/payments/get/${id}`
      );
      setCurPayment(result.data);
      console.log(result.data.customer);
      console.log(curPayment.customer);
    };

    loadPayment();
  });

  useEffect(() => {
    console.log(curPayment.customer);
    if (curPayment && curPayment.customer) {
      setCustomerId(curPayment.customer.id);
      setName(curPayment.name);
      setCardType(curPayment.cardType);
      setCardNumber(curPayment.cardNumber);
      setExpirationDate(curPayment.expirationDate);
      setSecurityCode(curPayment.securityCode);
    }
  }, [curPayment]);

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
        const response = await axios.put(
          `http://localhost:8080/payments/update/${id}`,
          newPayment
        );

        // Check for successful response
        if (response.status === 200) {
          console.log("Payment updated successfully:", response.data);
          navigate("/admin/view-payments");
        } else {
          console.error("Failed to update payment:", response.data);
        }
      } catch (error) {
        console.error("Error updating payment:", error.message);
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
      <h1>Editing Payment #{id}</h1>
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

export default EditPayment;
