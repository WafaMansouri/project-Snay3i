import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitByIdAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
const Search = () => {
  const search = useSelector((state) => state.search);
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  return (
    <div>
      <button
        style={{ width: 90 }}
        className="waves-effect waves-light btn"
        onClick={handleReturn}
      >
        <i class="large material-icons">arrow_back</i>
      </button>
      {!search.artisans.errors ? (
        search.artisans.length ? (
          <div className="container_search">
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
    </div>
  );
};
export default Search;

//Search Card
const SearchCard = ({ artisan }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleVist = () => {
    dispatch(visitByIdAction(artisan._id));
    history.push("/visit");
  };
  return (
    <div className="search_modal">
      <h4>{artisan.f_name + " " + artisan.l_name}</h4>
      <h4>{artisan.category}</h4>
      <h4>{artisan.description && artisan.description}</h4>
      <h4>{artisan.rate && artisan.rate}</h4>
      <button className="waves-effect waves-light btn" onClick={handleVist}>
        Visit Profile
      </button>
    </div>
  );
};
