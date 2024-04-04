import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";
import Navbar from "../../navbar";

function EditDiscountCode() {
  const { id } = useParams();

  const [curDiscountCode, setCurDiscountCode] = useState([]);

  const [code, setCode] = useState("");
  const [discountPercent, setdiscountPercent] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    loadDiscountCode();
  }, [id]);

  const loadDiscountCode = async () => {
    const result = await axios.get(
      `http://localhost:8080/discountCodes/get/${id}`
    );
    setCurDiscountCode(result.data);
  };

  useEffect(() => {
    if (curDiscountCode) {
      setCode(curDiscountCode.code);
      setdiscountPercent(curDiscountCode.discountPercent);
    }
  }, [curDiscountCode]);

  const handleClick = async (e) => {
    e.preventDefault();
    const discountCode = { code, discountPercent };
    await axios.put(
      `http://localhost:8080/discountCodes/update/${id}`,
      discountCode
    );
    navigate("/admin/view-discount-codes");
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <h1>Editing Discount Code #{id}</h1>
      <label htmlFor="code">Code: </label>
      <input
        type="text"
        name="code"
        defaultValue={code}
        onChange={(e) => setCode(e.target.value)}
      />{" "}
      <br></br>
      <label htmlFor="discountPercent">Discount Percentage: </label>
      <input
        type="number"
        name="discountPercent"
        value={discountPercent}
        onChange={(e) => setdiscountPercent(e.target.value)}
      ></input>
      %<br></br>
      <button onClick={() => navigate("/admin/view-discount-codes")}>
        Back
      </button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default EditDiscountCode;
