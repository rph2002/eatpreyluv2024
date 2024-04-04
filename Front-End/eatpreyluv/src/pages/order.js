import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Navbar from "./navbar";
import PageFooter from "../components/PageFooter";
import Loading from "../components/loading";

function Order() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);

  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0.0);

  const [isLoading, setIsLoading] = useState(false);

  const [customer, setCustomer] = useState(null);

  let navigate = useNavigate();
  let url = `https://eatpreyluv.s3.us-east-2.amazonaws.com/`;

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    setIsLoading(true);
    const customer_id = user.id;
    const result = await axios.get(
      `http://localhost:8080/cartItems/${customer_id}`
    );
    setIsLoading(false);
    setCartItems(result.data);
  };

  useEffect(() => {
    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.item.price * item.quantity;
    }
    setTotalPrice(totalPrice);

    const calculatedTax = (totalPrice * 8.25) / 100;
    setTax(calculatedTax);
  }, [cartItems]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `http://localhost:8080/customers/get/${user.id}`
      );
      setCustomer(result.data);
      const newPayment = {
        name,
        cardType,
        cardNumber,
        expirationDate,
        securityCode,
        customer: { id: result.data.id },
      };
      // Handle success here
      console.log("Customer data:", result.data);
      try {
        await axios.post("http://localhost:8080/payments/add", newPayment, {
          headers: { "Content-Type": "application/json" },
        });
        // Handle success here
        console.log("Payment added successfully!");
      } catch (error) {
        // Handle error here
        console.error("Error adding payment:", error);
      }

      console.log(cartItems);
      console.log(discountPercent);
      const requestData = {
        cartItems: cartItems, // Replace with your actual cart items data
        discountPercent: discountPercent, // Replace with your actual discount percentage
      };

      try {
        setIsLoading(true);
        const result = await axios.post(
          "http://localhost:8080/orders/placeOrder",
          requestData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // Handle success here
        console.log("Order placed successfully!");
        setIsLoading(false);
        navigate(`/order/${result.data.id}`);
      } catch (error) {
        // Handle error here
        console.error("Error adding order:", error);
      }
    } catch (error) {
      // Handle error here
      console.error("Error getting customer:", error);
    }
  };

  const handleCode = async (code) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/discountCodes/getByCode/${code}`
      );

      console.log(result);
      setDiscountPercent(result.data);
      if (discountPercent === 0.0) {
        console.log("Discount code not found");
      }
    } catch (error) {
      console.error("Discount code not found");
    }
  };
  return (
    <div>
      <PageHeader />
      <Navbar />
      {isLoading && <Loading />}
      <h1>Order</h1>
      <button onClick={() => navigate("/shopping-cart")}>
        Back to Shopping Cart
      </button>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, overflowY: "auto", maxHeight: "650px" }}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr>
                  <td>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={`${url}${cartItem.item.imagePath}`}
                      alt={cartItem.item.name}
                    ></img>
                  </td>
                  <td>{cartItem.item.name}</td>
                  <td>{cartItem.item.stock}</td>
                  <td>${cartItem.item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Subtotal: ${totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Tax(8.25%): ${(totalPrice * 0.0825).toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {discountPercent != 0.0 ? (
                    <p>
                      Price: ${(totalPrice + totalPrice * 0.0825).toFixed(2)}
                      <br></br>
                      Discount: {discountPercent}% ($
                      {((discountPercent / 100) * totalPrice).toFixed(2)})
                      <br></br> Total: $
                      {(
                        totalPrice +
                        totalPrice * 0.0825 -
                        (discountPercent / 100) * totalPrice
                      ).toFixed(2)}
                    </p>
                  ) : (
                    <p>
                      Total: $
                      {(
                        totalPrice +
                        totalPrice * 0.0825 -
                        (discountPercent / 100) * totalPrice
                      ).toFixed(2)}
                    </p>
                  )}
                </td>
                <td>
                  <label htmlFor="code">Discount Code: </label>
                  <input
                    className="PromptBox"
                    type="text"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  ></input>
                  <button onClick={() => handleCode(code)}>
                    Check For Discount
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: "16px",
            backgroundColor: "rgb(228, 235, 241)",
            borderRadius: "10px",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <div
            style={{
              marginLeft: "1rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h1>Payment</h1>
            <label htmlFor="name">Name: </label>
            <input
              className="PromptBox"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="cardType">Card Type: </label>
            <input
              className="PromptBox"
              type="text"
              name="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="cardNumber">Card Number: </label>
            <input
              className="PromptBox"
              type="text"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="expirationDate">Expiration Date: </label>
            <input
              className="PromptBox"
              type="text"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="securityCode">Security Code: </label>
            <input
              className="PromptBox"
              type="text"
              name="securityCode"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            ></input>
            <br></br>

            <br></br>
            <button onClick={handleClick}>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
