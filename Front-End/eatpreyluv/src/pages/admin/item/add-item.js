import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import Navbar from "../../navbar";
import PageFooter from "../../../components/PageFooter";

function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imagePath, setimagePath] = useState("");
  const [brandName, setbrandName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [animal, setAnimal] = useState("");

  const [image, setImage] = useState(null);

  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const user = {
      serialNumber,
      name,
      description,
      price,
      stock,
      imagePath,
      brandName,
      animal,
    };

    const formData = new FormData();
    formData.append("fileName", image.name);
    formData.append("file", image);
    setimagePath(image.name);

    axios
      .post("http://localhost:8080/file/upload", formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to upload image:", error);
      });

    console.log(user);
    fetch("http://localhost:8080/items/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    navigate("/admin/view-items");
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Description: </label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <label htmlFor="animal">Animal: </label>
      <select
        id="animal"
        type="text"
        name="animal"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
      >
        <option value="">-- Select an animal --</option>
        <option value="Dogs">Dog</option>
        <option value="Cats">Cat</option>
        <option value="Fish">Fish</option>
        <option value="Birsd">Bird</option>
        <option value="Reptiles">Reptile</option>
        <option value="Livestock">Livestock</option>
      </select>
      <br />

      <label htmlFor="price">Price: </label>
      <input
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <label htmlFor="stock">Stock: </label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <br />

      <label htmlFor="imagePath">Image Path: </label>
      <input
        type="text"
        id="imagePath"
        name="imagePath"
        value={imagePath}
        onChange={(e) => setimagePath(e.target.value)}
      />
      <br />

      <label htmlFor="address">Brand Name: </label>
      <input
        type="text"
        id="brandName"
        name="brandName"
        value={brandName}
        onChange={(e) => setbrandName(e.target.value)}
      />
      <br />

      <label htmlFor="serialNumber">Serial Number: </label>
      <input
        type="text"
        id="serialNumber"
        name="serialNumber"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      />
      <br />

      <input type="file" onChange={handleImageChange} />
      <br></br>
      <button onClick={() => navigate("/admin/view-items")}>Back</button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default AddItem;
