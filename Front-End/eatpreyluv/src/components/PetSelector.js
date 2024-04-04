import React from "react";
import PetType from "./PetTypeSelect";
import "./PetSelector.css";

function PetSelector() {
  let url = `https://eatpreyluv.s3.us-east-2.amazonaws.com/`;
  return (
    <div className="PetDisplay">
      <PetType className="DogImg" source={`${url}dog.jpg`} pet="Dogs" />
      <PetType className="CatImg" source={`${url}cat.jpg`} pet="Cats" />
      <PetType className="BirdImg" source={`${url}bird.jpg`} pet="Birds" />
      <PetType className="FishImg" source={`${url}fish.jpg`} pet="Fish" />
      <PetType
        className="ReptileImg"
        source={`${url}reptile.jpg`}
        pet="Reptiles"
      />
      <PetType
        className="LivestockImg"
        source={`${url}livestock.jpg`}
        pet="Livestock"
      />
    </div>
  );
}

export default PetSelector;
