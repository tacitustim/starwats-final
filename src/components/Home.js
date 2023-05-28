import React, { useState } from "react";

import Navbar from "./Navbar";
import Films from "./Films/Films";
import Planets from "./Planets/Planets";
import People from "./People/People";
import Starships from "./Starships/Starships";
import Species from "./Species/Species";
import Vehicles from "./Vehicles/Vehicles";

const Home = () => {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>STAR WARS</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? (
            <Planets />
          ) : page === "people" ? (
            <People />
          ) : page === "starships" ? (
            <Starships />
          )  : page === "species" ? (
            <Species />
          ) : page === "vehicle" ? (
            <Vehicles />
          ) : (
            <Films />
          )}
        </div>
        <Navbar setPage={setPage} />

        
      </div>
    </>
  );
};

export default Home;
