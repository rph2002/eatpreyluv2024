import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Navbar from "./navbar";
import PageFooter from "../components/PageFooter";

function UserOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () => {
    const customer_id = user.id;
    const resultOrders = await axios.get(
      `http://localhost:8080/orders/customer/${customer_id}`
    );

    const orderItemsPromises = resultOrders.data.map((order) =>
      axios.get(`http://localhost:8080/orderItems/order/${order.id}`)
    );

    const orderItems = await Promise.all(orderItemsPromises);

    const ordersWithOrderItems = resultOrders.data.map((order, index) => ({
      ...order,
      orderItems: orderItems[index].data,
    }));

    setOrders(ordersWithOrderItems);
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <h1 className="TitleHeader">Orders</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Items</th>
              <th>Shipping Address</th>
              <th>Shipping Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((orderItem) => (
                        <tr key={orderItem.id}>
                          <td className="itemName" style={{ width: "200px" }}>
                            {orderItem.item.name}
                          </td>
                          <td>${orderItem.item.price}</td>
                          <td>{orderItem.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <td></td>
                      <td>Total Price: ${order.price.toFixed(2)}</td>
                    </tfoot>
                  </table>
                </td>

                <td>{order.shipAddress}</td>
                <td>{order.shippedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserOrders;
