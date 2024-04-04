import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function EditItem() {
  const { id } = useParams();

  const [curItem, setCurItem] = useState([]);

  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imagePath, setimagePath] = useState("");
  const [brandName, setbrandName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [animal, setAnimal] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8080/items/get/${id}`);
    setCurItem(result.data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setimagePath(file.name);
  };

  useEffect(() => {
    if (curItem) {
      setName(curItem.name);
      setDescription(curItem.description);
      setPrice(curItem.price);
      setStock(curItem.stock);
      setimagePath(curItem.imagePath);
      setbrandName(curItem.brandName);
      setSerialNumber(curItem.serialNumber);
      setAnimal(curItem.animal);
    }
  }, [curItem]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (image != null) {
      const formData = new FormData();
      formData.append("fileName", image.name);
      formData.append("file", image);

      axios
        .post("http://localhost:8080/file/upload", formData)
        .then((response) => {
          console.log("Image uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Failed to upload image:", error);
        });
    }

    const item = {
      serialNumber,
      name,
      description,
      price,
      stock,
      imagePath,
      brandName,
      animal,
    };

    await axios.put(`http://localhost:8080/items/update/${id}`, item);
    navigate("/admin/view-items");
  };

  return (
    <div>
      <PageHeader />
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        defaultValue={name}
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
      <br />
      <button onClick={() => navigate("/admin/view-items")}>Back</button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default EditItem;
