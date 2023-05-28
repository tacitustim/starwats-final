import React, { useState } from "react";
import { useQuery } from "react-query";
import Specie from "./Specie";
import Loader from "../Loader";

const fetchSpesies = async (page) => {
  const res = await fetch(`https://swapi.dev/api/species/?page=${page}`);
  return res.json();
};

const Species = () => {
  const [page, setPage] = useState(1);


  const { data, status, isPreviousData } = useQuery(
    ["species", page],
    () => fetchSpesies(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Spesies Data feched successfully"),
      onError: () => console.log("Error while fetching data"),
    }
  );
  return (
    <>
      <h2>Species</h2>

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

          {data.results.map((specie) => (
            <Specie key={specie.name} specie={specie} />
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
export default Species;
