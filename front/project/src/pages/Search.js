import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitByIdAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
import { Rate } from "antd";
import { artisanRatesAction } from "../actions/artisanRatesAction";
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
    <div style={{ height: "100%", textAlign: "left" }}>
      <button
        className="waves-effect waves-light btn return"
        onClick={handleReturn}
      >
        <i class="large material-icons">arrow_back</i>
      </button>
      {!search.artisans.errors ? (
        search.artisans.length ? (
          <div className="search">
            {search.artisans.length === 1 ? (
              <h1>1 Result</h1>
            ) : (
              <h1>{search.artisans.length} Results</h1>
            )}

            <div className="container_search">
              {search.artisans.map((artisan, index) => {
                if (artisan)
                  return <SearchCard key={artisan._id} artisan={artisan} />;
              })}
            </div>
          </div>
        ) : (
          <div className="search">
            <h1>Not Found</h1>
          </div>
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
  useEffect(() => {
    dispatch(artisanRatesAction(artisan._id));
  }, [artisan._id]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  return (
    <div className="search_member">
      <div className="search_image">
        <img
          src={artisan.avatar ? artisan.avatar : "/images/profile_photo.png"}
          alt="profile photo"
        />
      </div>
      <h4>{upper(artisan.f_name) + " " + upper(artisan.l_name)}</h4>
      {rate_artisan.rate && (
        <div style={{ textAlign: "center" }}>
          <Rate
            style={{
              display: "flex",
              flexDirection: "row",
              color: "gray",
              fontSize: 12,
            }}
            allowHalf
            disabled
            defaultValue={rate_artisan.rate.rate}
          />
        </div>
      )}
      <p className="work">{artisan.category}</p>
      <ul>
        <li>
          <i className="small material-icons">add_location</i>&nbsp;
          {artisan.address && upper(artisan.address)}
        </li>
        <li>{artisan.description && upper(artisan.description)}</li>
      </ul>
      <button className="waves-effect waves-light btn" onClick={handleVist}>
        Visit Profile
      </button>
    </div>
  );
};
