import React, { useState } from "react";
import axios from "axios";
import "./Item.css";

const Item = ({ item }) => {
  let url = `https://eatpreyluv.s3.us-east-2.amazonaws.com/`;
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartItem = {
      item: { id: `${item.id}` }, // Remove the encoding of itemId
      customer: { id: `${user.id}` },
      quantity,
    };

    axios
      .get(`http://localhost:8080/cartItems/exists/${user.id}`, {
        params: {
          id: cartItem.item.id,
        },
      })
      .then((response) => {
        const itemExists = response.data; // Assuming the response returns a boolean indicating if the item exists
        if (itemExists) {
          console.log("Item exists in cart.");
        } else {
          console.log("Item does not exist in cart.");
          axios
            .post("http://localhost:8080/cartItems/add", cartItem, {
              headers: {
                "Content-Type": "application/json", // Set the Content-Type header to application/json
              },
            })
            .then((response) => {
              console.log("Item successfully added to cart");
            })
            .catch((error) => {
              console.error("Failed to add item to cart:", error);
            });

          console.log(item);
        }
      })
      .catch((error) => {
        console.error("Error making Axios request:", error);
      });
  };

  const handleIncrement = () => {
    if (quantity < item.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    // Decrement the selected quantity by 1, but not below 1
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item">
      <img
        className="ItemImg"
        src={`${url}${item.imagePath}`}
        alt={item.name}
      />
      <h3>{item.name}</h3>
      <h4>{item.description}</h4>
      <p>${item.price}</p>
      {item.stock < 15 && <p>Only {item.stock} left!</p>}
      <label htmlFor="quantity">Quantity:</label>
      <div className="quantity-control">
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <input
          className="quantity"
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          disabled // Disable the input field
        />
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button type="submit">Add to cart</button>
    </form>
  );
};

export default Item;
