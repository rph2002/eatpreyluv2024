import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import PageHeader from "../components/PageHeader";
import "../components/ShoppingCart.css";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);

  let url = `https://eatpreyluv.s3.us-east-2.amazonaws.com/`;

  const handleRemove = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/cartItems/delete/${id}`);
    loadCartItems();
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    const customer_id = user.id;
    const result = await axios.get(
      `http://localhost:8080/cartItems/${customer_id}`
    );
    setCartItems(result.data);
  };

  useEffect(() => {
    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.item.price * item.quantity;
    }
    setTotalPrice(totalPrice.toFixed(2));
  }, [cartItems]);

  let navigate = useNavigate();
  const handleOrder = (e) => {
    navigate("/order");
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1 className="TitleHeader">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h1 id="NoItems">No items in cart</h1>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr>
                  <td>
                    <img
                      id="CartItemImg"
                      src={`${url}${cartItem.item.imagePath}`}
                      alt={cartItem.item.name}
                    ></img>
                  </td>
                  <td>{cartItem.item.name}</td>
                  <td>{cartItem.item.stock}</td>
                  <td>${cartItem.item.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>
                    <button
                      onClick={(event) => handleRemove(cartItem.id, event)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Price: ${totalPrice}</td>
              </tr>
            </tfoot>
          </table>
          <button onClick={handleOrder}>Order</button>
        </div>
      )}
    </form>
  );
}

export default ShoppingCart;
