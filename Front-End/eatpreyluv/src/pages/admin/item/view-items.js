import axios from "axios";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function ViewItems() {
  const [items, setItems] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8080/items/all");
    setItems(result.data);
  };

  const deleteItem = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/items/delete/${id}`);
    loadItems();
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Items</h1>
      <button onClick={() => navigate("/admin")}>Back</button>
      <button onClick={() => navigate("/admin/add-item")}>Add Item</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Animal</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Brand Name</th>
              <th>Serial Number</th>
              <th>Image Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.animal}</td>
                <td>${item.price}</td>
                <td>{item.stock}</td>
                <td>{item.brandName}</td>
                <td>{item.serialNumber}</td>
                <td>{item.imagePath}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/edit-item/${item.id}`)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={(event) => deleteItem(item.id, event)}>
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

export default ViewItems;
