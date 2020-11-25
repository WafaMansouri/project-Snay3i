import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import {
  searchByNameAction,
  searchByCategoryAction,
} from "../actions/clientActions";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);

  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const searchByName = (e) => {
    e.preventDefault();
    dispatch(searchByNameAction(name));
    history.push("/search");
    setname("");
  };
  const searchByCategory = (e) => {
    e.preventDefault();
    dispatch(searchByCategoryAction(category));
    history.push("/search");
    setcategory("");
  };
  return (
    <div className="navBar">
      <img src="/logo2.png" width="90px" height="90px" alt="logo" />
      <div style={{ display: "flex" }}>
        <div className="dropdown">
          <button className="dropbtn">
            <i class="small material-icons">search</i>
          </button>
          <div className="dropdown-content">
            <a onClick={(e) => setsearch("name")}>By Name</a>
            <a onClick={(e) => setsearch("category")}>By Category</a>
          </div>
        </div>
        {search === "name" ? (
          <form className="search" onSubmit={searchByName}>
            <input
              value={name}
              type="text"
              placeholder="&nbsp; Search By Name"
              className="search"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={(e) => setname(e.target.value)}
            />
          </form>
        ) : (
          search === "category" && (
            <form className="search" onSubmit={searchByCategory}>
              <input
                value={category}
                type="text"
                placeholder="Search By Category"
                className="search"
                style={{ fontFamily: "Arial, FontAwesome" }}
                onChange={(e) => setcategory(e.target.value)}
              />
            </form>
          )
        )}
      </div>
      <div style={{ width: 800 }}></div>
      <div className="links">
        {auth.isAuth ? (
          <>
            <Link to="/profile">Profile</Link>
            {/* if the user is admin */}
            {auth.user && auth.user.state === "Admin" && (
              <Link to="/admin">Admin</Link>
            )}
            <Link to="" onClick={() => dispatch(logOut())}>
              Logout
            </Link>
            {/* icon notification */}
            {auth.user && auth.user.state === "Client" ? (
              <Link to="/requests-client">
                <i class="medium material-icons">drafts</i>
              </Link>
            ) : (
              <Link to="/requests">
                <i class="medium material-icons">drafts</i>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link style={{ width: 170 }} to="">
              Contact Us
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
