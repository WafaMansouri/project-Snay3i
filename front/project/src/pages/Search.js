import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitByIdAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
//function that convert the first letter of a string to uppercase
const upper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

const Search = () => {
  const search = useSelector((state) => state.search);
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  return (
    <div>
      <button className="waves-effect waves-light btn" onClick={handleReturn}>
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
      <ul>
        <div>
          <li style={{ fontWeight: "bold" }}>
            <i class="small material-icons">account_circle</i>&nbsp;
            {upper(artisan.f_name) + " " + upper(artisan.l_name)}
          </li>
          <li>
            <i class="small material-icons">work</i>&nbsp;
            {upper(artisan.category)}
          </li>
          <li>
            <i class="small material-icons">add_location</i>&nbsp;
            {artisan.address && upper(artisan.address)}
          </li>
        </div>
        {/* <li>{artisan.description && upper(artisan.description)}</li>
        <li>{artisan.rate && artisan.rate}</li> */}
      </ul>
      <button
        style={{ borderRadius: 20 }}
        className="waves-effect waves-light btn"
        onClick={handleVist}
      >
        Visit Profile
      </button>
    </div>
  );
};
