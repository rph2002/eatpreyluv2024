import React from "react";
import "./PetTypeSelect.css";
import { useNavigate } from "react-router-dom";

function PetType(props) {
  let navigate = useNavigate();
  return (
    <div className="PetTypeContainer">
      <img
        className="DogImg"
        src={props.source}
        alt=""
        onClick={() => navigate(`/shop/${props.pet}`)}
      />
      <h2
        className="PetType PetTypeButton"
        onClick={() => navigate(`/shop/${props.pet}`)}
      >
        {props.pet}
      </h2>
    </div>
  );
}

export default PetType;
