import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../components/UserForm.css";
import { Regex, stateAbbreviations } from "../../../components/regex";
import Navbar from "../../navbar.js";
import PageHeader from "../../../components/PageHeader.js";

function EditUser() {
  const { id } = useParams();

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
  const [admin, setAdmin] = useState(false);

  const [validationResult, setValidationResult] = useState("");

  const [finalValidation, setFinalValidation] = useState(false);

  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/customers/get/${id}`);
    setCurUser(result.data);
  };

  useEffect(() => {
    if (curUser) {
      console.log(curUser);
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
      setAdmin(curUser.admin);
    }
  }, [curUser]);

  // Validation regex for zip code: 5 digits, optional 4-digit extension
  const zipRegex = /^\d{5}(?:-\d{4})?$/;

  const address1Field = useRef(null);
  const address2Field = useRef(null);
  const postalField = useRef(null);
  let autocomplete;

  let navigate = useNavigate();

  // handle state change
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAdminChange = (event) => {
    if (event.target.checked) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    console.log(admin);
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

    setValidationResult("");
    setFinalValidation(false);

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
        admin: admin,
      };

      console.log(email);
      console.log(user.email);
      if (email != user.email) {
        await axios.post("http://localhost:8080/customers/validateNewUser", {
          email,
        });
        setValidationResult("Email already exists!");
      } else {
        await axios.put(`http://localhost:8080/customers/update/${id}`, user);

        navigate("/admin/view-users");
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
            className={`form-control`}
            value={fName}
            onChange={(e) => setfName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className={`form-control`}
            value={lName}
            placeholder="Last Name"
            onChange={(e) => setlName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control`}
            value={email}
            placeholder="sample@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className={`form-control`}
            value={phone}
            placeholder="(123)-456-7890"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            id="ship-address"
            ref={address1Field}
            className={`form-control`}
            value={address}
            placeholder="123 Street Drive"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            id="postcode"
            ref={postalField}
            className={`form-control`}
            value={zip}
            placeholder="12345"
            onChange={(e) => setZip(e.target.value)}
          />
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

        <div className="FieldInput">
          <label>Admin</label>
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={admin}
            onChange={handleAdminChange}
          />
        </div>

        <div>{validationResult}</div>

        <div id="AccSubmit">
          <button
            id="SubmitButton"
            onClick={() => navigate("/admin/view-users")}
          >
            Back
          </button>
          <button id="SubmitButton" onClick={handleClick}>
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
