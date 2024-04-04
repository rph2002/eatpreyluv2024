import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("customerId");
  const [sortOrder, setSortOrder] = useState("asc");

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, [id]);

  const loadOrders = async () => {
    try {
      const result = await axios.get("http://localhost:8080/orders/all");
      setOrders(result.data);
    } catch (error) {
      console.error("Error fetching orders");
    }
  };

  const deleteOrder = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/orders/delete/${id}`);
    loadOrders();
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredOrders = orders.sort((a, b) => {
    // Sort items based on sort criteria and sort order
    if (sortCriteria === "price") {
      // Sort by price
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    } else if (sortCriteria === "customerId") {
      // Sort by name (default)
      if (sortOrder === "asc") {
        return a.customer.id - b.customer.id;
      } else {
        return b.customer.id - a.customer.id;
      }
    } else {
      // Convert a and b to Date objects
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);

      if (sortOrder === "asc") {
        // Compare dateA and dateB for ascending order
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      } else {
        // Compare dateA and dateB for descending order
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Orders</h1>
      <button onClick={() => navigate("/admin")}>Back</button>

      <br></br>
      <div>
        <label htmlFor="sortCriteria">Sort by:</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={handleSortChange}
        >
          <option value="customerId">Customer ID</option>
          <option value="orderDate">Order Date</option>
          <option value="price">Total Price</option>
        </select>
        <label htmlFor="sortOrder">Sort order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Shipping Date</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
            </tr>
          </tbody>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer.id}</td>
                <td>{order.orderStatus}</td>
                <td>{order.orderDate}</td>
                <td>{order.shippedDate}</td>
                <td>{order.shipAddress}</td>
                <td>{order.price}</td>

                <td>
                  <button onClick={() => navigate("/admin/edit-order")}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={(event) => deleteOrder(order.id, event)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}

export default ViewOrders;
