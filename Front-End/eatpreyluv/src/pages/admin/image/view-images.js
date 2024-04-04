import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";
import "./ViewImages.css";

function ViewImages() {
  const [images, setImages] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const result = await axios.get("http://localhost:8080/files");
    setImages(result.data);
  };

  const deleteImage = async (fileName, event) => {
    event.preventDefault();

    try {
      console.log(fileName);
      await axios.delete(`http://localhost:8080/file/delete/${fileName}`);
      console.log("File deleted successfully");
      await loadImages();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Images</h1>
      <button onClick={() => navigate("/admin")}>Back</button>
      <button onClick={() => navigate("/admin/add-image")}>Add Image</button>
      <div id="ImgShow">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>File Name</th>
              <th>Image URL</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr>
                <td>
                  <img
                    className="Images"
                    src={image.fileUrl}
                    alt={image.fileName}
                  ></img>
                </td>
                <td>{image.fileName}</td>
                <td>{image.fileUrl}</td>
                <td>
                  <button
                    onClick={(event) => deleteImage(image.fileName, event)}
                  >
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

export default ViewImages;
