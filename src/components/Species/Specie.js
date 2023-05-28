import React from "react";
import {useState} from 'react';

const Specie = ({ specie }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl =  (specieUrl) => {
    const specieId = specieUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/species/${specieId}.jpg`;
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="card">
      <h3> {specie.name}</h3>
      <div className="image-container">
      <img
            src={imageError ? "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" : getImageUrl(specie.url)}
            alt= {specie.name}
            className= "planet-image"
            onError={handleImageError}
          />
      </div>
      <p>Classification -  {specie.classification}</p>
      <p>Language -  {specie.language}</p>
    </div>
  );
};

export default Specie;
