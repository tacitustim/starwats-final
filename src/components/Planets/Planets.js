import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";
import Loader from "../Loader";

const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);


  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Planets Data feched successfully"),
      onError: () => console.log("Error while fetching data"),
    }
  );
  return (
    <>
      <h2>Planets</h2>

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (
        <div>
          <div className="pagination">
            <button
              className="pagination__prev"
              onClick={() => setPage((old) => Math.min(old - 1, old))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              className="pagination__next"
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={!data.next}
            >
              Next
            </button>
          </div>

          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
          <div className="pagination">
            <button
              className="pagination__left"
              onClick={() => setPage((old) => Math.min(old - 1, old))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              className="pagination__right"
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={!data.next}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
      
    </>
    
  );
};
export default Planets;
