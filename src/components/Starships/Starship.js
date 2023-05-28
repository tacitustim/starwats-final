import React from "react";
import {useState} from 'react';

const Starship = ({ starship }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl =  (starshipUrl) => {
    const starshipId = starshipUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`;
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="card">
      <h3>{starship.name}</h3>
      <div className="image-container">
      <img
            src={imageError ? "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" : getImageUrl(starship.url)}
            alt= {starship.name}
            className= "planet-image"
            onError={handleImageError}
          />
      </div>
      <p>Manufacturer - {starship.manufacturer}</p>
      <p>Model - {starship.model}</p>
    </div>
  );
};

export default Starship;
