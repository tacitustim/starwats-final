import React from "react";
import {useState} from 'react';

const Planet = ({ planet }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = (planetUrl) => {
    const planetId = planetUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <div className="image-container">
      <img
            src={imageError ? "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" : getImageUrl(planet.url)}
            alt={planet.name}
            className="planet-image"
            onError={handleImageError}
          />
      </div>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain}</p>
    </div>
  );
};

export default Planet;
