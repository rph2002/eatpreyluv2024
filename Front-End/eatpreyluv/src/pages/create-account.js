import React from "react";
import { Link } from "react-router-dom";
import UserForm from "../user-form";
import "../components/CreateAccount.css";

function CreateAccount() {
  return (
    <div>
      <div id="InputSection">
        <h1 id="CreateAccount">Create Account</h1>
        <UserForm />
        <footer>
          <Link id="LoginLink" to="/">
            Already have an account?
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default CreateAccount;
