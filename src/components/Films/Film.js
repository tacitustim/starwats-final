import React from "react";
import {useState} from 'react';

const Film = ({ film }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl =  (filmUrl) => {
    const filmId = filmUrl.split("/").slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;
  };
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="card">
      <h3>{film.title}</h3>
      <div className="image-container">
      <img
            src={imageError ? "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" : getImageUrl(film.url)}
            alt= {film.name}
            className= "planet-image"
            onError={handleImageError}
          />
      </div>
      <p>Director - {film.director}</p>
      <p>Release Date - {film.release_date}</p>
    </div>
  );
};

export default Film;
