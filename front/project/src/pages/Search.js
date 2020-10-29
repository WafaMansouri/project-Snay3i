import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitByIdAction } from "../actions/clientActions";
import { RETURN_SEARCH } from "../actions/types";
import { useHistory } from "react-router-dom";
const Search = () => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReturn = () => {
    dispatch({ type: RETURN_SEARCH });
    history.goBack();
  };
  return (
    <>
      {!search.artisans.errors ? (
        search.artisans.length ? (
          <div>
            {search.artisans.map((artisan, index) => {
              return <SearchCard key={index} artisan={artisan} />;
            })}
          </div>
        ) : (
          <h3>NOT FOUND</h3>
        )
      ) : (
        <h2>{search.artisans.errors}</h2>
      )}
      <button onClick={handleReturn}>return</button>
    </>
  );
};

const SearchCard = ({ artisan }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleVist = () => {
    dispatch(visitByIdAction(artisan._id));
    history.push("/visit");
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
