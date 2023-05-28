import React from "react";
import {useState} from 'react';

const Vehicle = ({ vehicle }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl =  (vehicleUrl) => {
    const vehicleId = vehicleUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`;
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="card">
      <h3> {vehicle.name}</h3>
      <div className="image-container">
      <img
            src={imageError ? "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" : getImageUrl(vehicle.url)}
            alt= {vehicle.name}
            className= "planet-image"
            onError={handleImageError}
          />
      </div>
      <p>Model -  {vehicle.model}</p>
      <p>Manufacturer -  {vehicle.manufacturer}</p>
    </div>
  );
};

export default Vehicle;
