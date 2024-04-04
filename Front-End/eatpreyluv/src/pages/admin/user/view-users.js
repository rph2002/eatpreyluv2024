import axios from "axios";
import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar";
import PageHeader from "../../../components/PageHeader";
import PageFooter from "../../../components/PageFooter";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, [id]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/customers/all");
    setUsers(result.data);
  };

  const deleteUser = async (id, event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8080/customers/delete/${id}`);
    loadUsers();
  };

  return (
    <form>
      <PageHeader />
      <Navbar />
      <h1>Users</h1>
      <button onClick={() => navigate("/admin")}>Back</button>
      <button onClick={() => navigate("/admin/add-user")}>Add User</button>
      <div>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Address</th>
              <th>Admin</th>
            </tr>
          </tbody>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  {user.address}, {user.city}, {user.state} {user.zip},{" "}
                  {user.country}
                </td>
                <td>{user.admin ? <p>Yes</p> : <p>No</p>}</td>
                <td></td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={(event) => deleteUser(user.id, event)}>
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

export default ViewUsers;
