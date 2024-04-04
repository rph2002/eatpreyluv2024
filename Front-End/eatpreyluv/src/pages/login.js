import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../components/login.css";
import Loading from "../components/loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationResult, setValidationResult] = useState("");
  const [isLoading, setIsLoading] = useState(false); // new state variable

  const handleValidation = async (email, password) => {
    try {
      setIsLoading(true); // start loading

      const response = await axios.post(
        "http://localhost:8080/customers/validateUser",
        { email, password }
      );

      setValidationResult(response.data);

      const getUserResponse = await axios.get(
        `http://localhost:8080/customers/getUser/${email}`
      );

      const user = getUserResponse.data;
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoading(false); // stop loading
      routeChange();
    } catch (error) {
      setIsLoading(false); // stop loading
      setValidationResult("Invalid email or password.");
    }
  };

  let navigate = useNavigate();
  const routeChange = (e) => {
    let path = "/home";
    navigate(path);
  };

  return (
    <div className="LoginPage">
      <div className="Login">
        <h1 id="LoginTitle">Login</h1>
        <label className="PromptText" htmlFor="email">
          Email:{" "}
        </label>
        <input
          className="PromptBox"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="PromptText" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className="PromptBox"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          id="ValidationClick"
          onClick={() => handleValidation(email, password)}
        >
          Submit
        </button>
        <div>{validationResult}</div>
        {isLoading && <Loading />} {/* new loading component */}
        <footer id="LoginFooter">
          <p>Don't have an account? Sign up here:</p>
          <Link id="CreateAccLink" to="/create-account">
            Create Account
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
