import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const search = useSelector((state) => state.search);

  return (
    <div>
      {search.artisans.map((artisan) => {
        return <SearchCard artisan={artisan} />;
      })}
    </div>
  );
};
const SearchCard = ({ artisan }) => {
  return (
    <div>
      <h2>{artisan.f_name + " " + artisan.l_name}</h2>
      <h2>{artisan.category}</h2>
      <h2>{artisan.description && artisan.description}</h2>
      <h2>{artisan.rate && artisan.rate}</h2>
    </div>
  );
};

export default Search;
