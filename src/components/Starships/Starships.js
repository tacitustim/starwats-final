import React, { useState } from "react";
import { useQuery } from "react-query";
import Starship from "./Starship";
import Loader from "../Loader";

const fetchStarships = async (page) => {
  const res = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  return res.json();
};

const Starships = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["starships", page],
    () => fetchStarships(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Starships Data feched successfully"),
      onError: () => console.log("Error while fetching data of Starships"),
    }
  );

  return (
    <>
      <h2>Starships</h2>

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (
        <div>
          <div>
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
            {data.results.map((starship) => (
              <Starship key={starship.name} starship={starship} />
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
        </div>
      ) : null}
      
    </>
  );
};

export default Starships;
