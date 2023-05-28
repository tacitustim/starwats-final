import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";
import Loader from "../Loader";

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("People Data feched successfully"),
      onError: () => console.log("Error while fetching data"),
    }
  );

  return (
    <>
      <h2>People</h2>

      {status === "loading" ? (
        <Loader />
      ) : status === "error" ? (
        <div> Error fetching data</div>
      ) : status === "success" ? (
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
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
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

export default People;
