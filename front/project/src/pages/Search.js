import React, { useEffect, useState } from "react";
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
      <div style={{ display: "grid", gridTemplateColumns: "50px auto" }}>
        <button
          className="waves-effect waves-light btn return"
          onClick={handleReturn}
        >
          <i class="large material-icons">arrow_back</i>
        </button>
        {search.artisans.length !== 0 &&
          (search.artisans.length === 1 ? (
            <h1 className="search_result">1 Result</h1>
          ) : (
            <h1 className="search_result">{search.artisans.length} Results</h1>
          ))}
      </div>
      {!search.artisans.errors ? (
        search.artisans.length ? (
          <div className="search">
            <div className="container_search">
              {search.artisans.map((artisan) => {
                if (artisan) {
                  let count = 0;
                  artisan.rates.map((rate) => {
                    count += rate.value;
                  });
                  return (
                    <SearchCard
                      key={artisan._id}
                      artisan={artisan}
                      rate={
                        artisan.rates.length > 0
                          ? count / artisan.rates.length
                          : 0
                      }
                    />
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="search">
            <h1 className="search_result">Not Found</h1>
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
const SearchCard = ({ artisan, rate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const handleVist = () => {
    if (auth.user && auth.user._id === artisan._id) {
      history.push("/profile");
    } else {
      dispatch(visitByIdAction(artisan._id));
      history.push(`/visit`);
    }
  };
  return (
    <div className="search_member">
      <div className="search_member_info">
        <div className="search_image">
          <img
            src={artisan.avatar ? artisan.avatar : "/images/profile_photo.png"}
            alt="profile photo"
          />
        </div>
        <h4>{upper(artisan.f_name) + " " + upper(artisan.l_name)}</h4>
        <div style={{ textAlign: "center" }}>
          <Rate
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: 18,
            }}
            allowHalf
            disabled
            value={rate}
          />
        </div>
        <p className="work">{artisan.category}</p>
        <ul>
          <li style={{ marginBottom: 13 }}>
            <i className="small material-icons">add_location</i>&nbsp;
            {artisan.address && upper(artisan.address)}
          </li>
          <li style={{ fontWeight: "400", lineHeight: "1.2em" }}>
            {artisan.description && upper(artisan.description)}
          </li>
        </ul>
      </div>
      <button className="waves-effect waves-light btn" onClick={handleVist}>
        Visit Profile
      </button>
    </div>
  );
};
