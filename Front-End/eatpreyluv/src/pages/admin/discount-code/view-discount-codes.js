import axios from "axios";
import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function ViewDiscountCodes() {
  const [discountCodes, setDiscountCodes] = useState([]);

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadDiscountCodes();
  }, [id]);

  const loadDiscountCodes = async () => {
    const result = await axios.get("http://localhost:8080/discountCodes/all");
    setDiscountCodes(result.data);
  };

  const deleteDiscountCodes = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/discountCodes/delete/${id}`);
    loadDiscountCodes();
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Discount Codes</h1>
      <button onClick={() => navigate("/admin")}>Back</button>
      <button onClick={() => navigate("/admin/add-discount-code")}>
        Add Discount Code
      </button>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Discount Code ID</th>
              <th>Discount Code</th>
              <th>Percent Off</th>
            </tr>
          </tbody>
          <tbody>
            {discountCodes.map((discountCode, index) => (
              <tr key={index}>
                <td>{discountCode.discountCodeId}</td>
                <td>{discountCode.code}</td>
                <td>{discountCode.discountPercent}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/edit-discount-code/${discountCode.discountCodeId}`
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(event) =>
                      deleteDiscountCodes(discountCode.discountCodeId, event)
                    }
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

export default ViewDiscountCodes;
