import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Navbar from "./navbar";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "../components/OrderConfirmed.css";

function OrderConfirmed() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const resultOrder = await axios.get(
        `http://localhost:8080/orders/get/${id}`
      );
      setOrder(resultOrder.data);

      const resultOrderItems = await axios.get(
        `http://localhost:8080/orderItems/order/${id}`
      );
      setOrderItems(resultOrderItems.data);
    } catch (error) {
      console.error("Error fetching order");
    }
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <div id="OrderConfirmed">
        <h1>Order Confirmed!</h1>
        <br></br>
        <h2>Order #{order.id}</h2>
        <p>Order Date: {order.orderDate}</p>
        <p>Order Status: {order.orderStatus}</p>
        <p>Shipping Address: {order.shipAddress}</p>
        <p>Order Price: ${order.price}</p>
        <p>Items: </p>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderItem) => (
              <tr key={orderItem.id}>
                <td className="itemName" style={{ width: "300px" }}>
                  {orderItem.item.name}
                </td>
                <td>${orderItem.item.price}</td>
                <td>{orderItem.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td>Total Price: ${order.price}</td>
          </tfoot>
        </table>

        <p id="DirectToOrders">
          <line></line>Your order has been received! <br></br>You should receive
          more information about shipping in your email!
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmed;
