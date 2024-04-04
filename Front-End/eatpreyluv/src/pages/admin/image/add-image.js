import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/PageHeader";
import Navbar from "../../navbar";
import PageFooter from "../../../components/PageFooter";

function AddImage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  let navigate = useNavigate();
  const routeChange = (e) => {
    let path = "/admin/view-images";
    navigate(path);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileName", image.name);
    formData.append("file", image);

    axios
      .post("http://localhost:8080/file/upload", formData)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        routeChange();
      })
      .catch((error) => {
        console.error("Failed to upload image:", error);
      });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <PageHeader />
      <Navbar />
      <button onClick={() => navigate("/admin/view-images")}>Back</button>
      <br></br>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddImage;
