import axios from "axios";
import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function ViewPayments() {
  const [payments, setPayments] = useState([]);

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadPayments();
  }, [id]);

  const loadPayments = async () => {
    const result = await axios.get("http://localhost:8080/payments/all");
    setPayments(result.data);
  };

  const deletePayment = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/payments/delete/${id}`);
    loadPayments();
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Payments</h1>
      <button onClick={() => navigate("/admin")}>Back</button>
      <button onClick={() => navigate("/admin/add-payment")}>
        Add Payment
      </button>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Payment ID</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Card Type</th>
              <th>Card Number</th>
              <th>Expiration Date</th>
              <th>Security Code</th>
            </tr>
          </tbody>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.id}</td>
                <td>{payment.customer.id}</td>
                <td>{payment.name}</td>
                <td>{payment.cardType}</td>
                <td>{payment.cardNumber}</td>
                <td>{payment.expirationDate}</td>
                <td>{payment.securityCode}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-payment/${payment.id}`)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={(event) => deletePayment(payment.id, event)}>
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

export default ViewPayments;
