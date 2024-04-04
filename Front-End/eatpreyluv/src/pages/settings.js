import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/UserForm.css";
import { Regex, stateAbbreviations } from "../components/regex";
import Navbar from "./navbar.js";
import PageHeader from "../components/PageHeader.js";

function Settings() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [fNameValidation, setFNameValidation] = useState("");
  const [lNameValidation, setLNameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [phoneValidation, setPhoneValidation] = useState("");
  const [addressValidation, setAddressValidation] = useState("");
  const [zipValidation, setZipValidation] = useState("");
  const [validationResult, setValidationResult] = useState("");

  const [finalValidation, setFinalValidation] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("user"));
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, [localUser.id]);

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8080/customers/get/${localUser.id}`
    );
    setCurUser(result.data);
  };

  useEffect(() => {
    if (curUser) {
      setfName(curUser.fName);
      setlName(curUser.lName);
      setPassword(curUser.password);
      setEmail(curUser.email);
      setPhone(curUser.phone);
      setAddress(curUser.address);
      setCity(curUser.city);
      setState(curUser.state);
      setZip(curUser.zip);
      setCountry(curUser.country);
    }
  }, [curUser]);

  // Validation regex for zip code: 5 digits, optional 4-digit extension
  const zipRegex = /^\d{5}(?:-\d{4})?$/;

  const address1Field = useRef(null);
  const address2Field = useRef(null);
  const postalField = useRef(null);
  let autocomplete;

  let navigate = useNavigate();
  const routeChange = (e) => {
    let path = "/home";
    navigate(path);
  };

  // handle state change
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    const initAutocomplete = () => {
      autocomplete = new window.google.maps.places.Autocomplete(
        address1Field.current,
        {
          componentRestrictions: { country: ["us", "ca"] },
          fields: ["address_components", "geometry"],
          types: ["address"],
        }
      );
      address1Field.current.focus();
      autocomplete.addListener("place_changed", fillInAddress);
    };

    const fillInAddress = () => {
      const place = autocomplete.getPlace();
      let address1 = "";
      let postcode = "";

      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }

          case "route": {
            address1 += component.short_name;

            setAddress(address1);
            break;
          }

          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            setZip(postcode);
            break;
          }

          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            setZip(postcode);
            break;
          }

          case "locality": {
            document.querySelector("#locality").value = component.long_name;
            setCity(component.long_name);
            break;
          }

          case "administrative_area_level_1": {
            document.querySelector("#state").value = component.short_name;
            setState(component.short_name);
            break;
          }

          case "country": {
            document.querySelector("#country").value = component.long_name;
            setCountry(component.long_name);
            break;
          }

          default:
            break;
        }
      }

      address1Field.current.value = address1;
      postalField.current.value = postcode;
      address2Field.current.focus();
    };

    window.initAutocomplete = initAutocomplete;
    initAutocomplete();

    return () => {
      delete window.initAutocomplete;
      autocomplete.unbindAll();
    };
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    setFNameValidation("");
    setLNameValidation("");
    setPasswordValidation("");
    setEmailValidation("");
    setPhoneValidation("");
    setAddressValidation("");
    setZipValidation("");
    setValidationResult("");
    setFinalValidation(false);

    if (!fName) {
      setFNameValidation("Please enter your first name");
      setFinalValidation(true);
    }

    if (!lName) {
      setLNameValidation("Please enter your last name");
      setFinalValidation(true);
    }

    if (!email.match(Regex.emailPattern)) {
      setEmailValidation("Please enter a valid email address");
      setFinalValidation(true);
    }

    // Validate password
    if (!password.match(Regex.passwordPattern)) {
      setPasswordValidation(
        `Please enter a valid password (at least 8 characters, one uppercase letter,
          one lowercase letter, and one number)`
      );
      setFinalValidation(true);
    }

    // Validate phone number
    if (!phone.match(Regex.phonePattern)) {
      setPhoneValidation("Please enter a valid phone number");
      setFinalValidation(true);
    }

    // Validate zip code
    if (!zip.match(zipRegex)) {
      setZipValidation("Please enter a valid zip code");
      setFinalValidation(true);
    }

    console.log(finalValidation);

    if (!finalValidation) {
      const user = {
        fName: fName.trim(),
        lName: lName.trim(),
        password: password.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        zip: zip.trim(),
      };

      console.log(localUser.email);
      console.log(user.email);
      if (localUser.email != user.email) {
        await axios.post("http://localhost:8080/customers/validateNewUser", {
          email,
        });
        setValidationResult("Email already exists!");
      } else {
        await axios.put(
          `http://localhost:8080/customers/update/${localUser.id}`,
          user
        );

        const result = await axios.get(
          `http://localhost:8080/customers/getUser/${user.email}`
        );
        const updatedUser = result.data;

        localStorage.setItem("user", JSON.stringify(updatedUser));

        routeChange();
      }
    }
  };

  return (
    <div>
      <PageHeader />
      <Navbar />
      <form id="CreateAccForm">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            className={`form-control ${fNameValidation ? "error" : ""}`}
            value={fName}
            onChange={(e) => setfName(e.target.value)}
          />
          {fNameValidation && (
            <div className="error-msg">{fNameValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className={`form-control ${lNameValidation ? "error" : ""}`}
            value={lName}
            placeholder="Last Name"
            onChange={(e) => setlName(e.target.value)}
          />
          {lNameValidation && (
            <div className="error-msg">{lNameValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${emailValidation ? "error" : ""}`}
            value={email}
            placeholder="sample@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailValidation && (
            <div className="error-msg">{emailValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control ${passwordValidation ? "error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordValidation && (
            <div className="error-msg">{passwordValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className={`form-control ${phoneValidation ? "error" : ""}`}
            value={phone}
            placeholder="(123)-456-7890"
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneValidation && (
            <div className="error-msg">{phoneValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            id="ship-address"
            ref={address1Field}
            className={`form-control ${addressValidation ? "error" : ""}`}
            value={address}
            placeholder="123 Street Drive"
            onChange={(e) => setAddress(e.target.value)}
          />
          {addressValidation && (
            <div className="error-msg">{addressValidation}</div>
          )}
        </div>

        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            id="postcode"
            ref={postalField}
            className={`form-control ${zipValidation ? "error" : ""}`}
            value={zip}
            placeholder="12345"
            onChange={(e) => setZip(e.target.value)}
          />
          {zipValidation && <div className="error-msg">{setZipValidation}</div>}
        </div>

        <div className="FieldInput">
          <label>City</label>
          <input
            className="InputBox"
            id="locality"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="FieldInput">
          <label>State</label>
          <select
            id="state"
            value={state}
            onChange={handleStateChange}
            className="InputBox"
          >
            {stateAbbreviations.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="FieldInput">
          <label>Country</label>
          <input
            className="InputBox"
            id="country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>{validationResult}</div>

        <div id="AccSubmit">
          <button id="SubmitButton" onClick={handleClick}>
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
