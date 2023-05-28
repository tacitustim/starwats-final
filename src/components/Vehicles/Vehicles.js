import React, { useState } from "react";
import { useQuery } from "react-query";
import Vehicle from "./Vehicle";
import Loader from "../Loader";

const fetchSpesies = async (page) => {
  const res = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
  return res.json();
};

const Vehicles = () => {
  const [page, setPage] = useState(1);


  const { data, status, isPreviousData } = useQuery(
    ["vehicles", page],
    () => fetchSpesies(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Spesies Data feched successfully"),
      onError: () => console.log("Error while fetching data"),
    }
  );
  return (
    <>
      <h2>Vehicles</h2>

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

          {data.results.map((vehicle) => (
            <Vehicle key={vehicle.name} vehicle={vehicle} />
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
export default Vehicles;
