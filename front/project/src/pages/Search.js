import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitByIdAction } from "../actions/clientActions";
import { RETURN_SEARCH } from "../actions/types";

const Search = ({ history }) => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleReturn = () => {
    dispatch({ type: RETURN_SEARCH });
    console.log(search.test);
  };
  return (
    <>
      {search.artisans.length ? (
        <div>
          {search.artisans.map((artisan, index) => {
            return <SearchCard key={index} artisan={artisan} />;
          })}
        </div>
      ) : (
        <h2>Not Found</h2>
      )}
      <button onClick={handleReturn}>return</button>
    </>
  );
};

const SearchCard = ({ artisan }) => {
  const dispatch = useDispatch();
  const handleVist = () => {
    dispatch(visitByIdAction(artisan._id));
  };
  return (
    <div style={{ border: "1px solid green" }}>
      <h4>{artisan.f_name + " " + artisan.l_name}</h4>
      <h4>{artisan.category}</h4>
      <h4>{artisan.description && artisan.description}</h4>
      <h4>{artisan.rate && artisan.rate}</h4>
      <button onClick={handleVist}>Visit Profile</button>
    </div>
  );
};

export default Search;