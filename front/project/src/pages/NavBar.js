import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import { searchByNameAction } from "../actions/clientActions";
import Search from "./Search";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const [searchTest, setsearchTest] = useState(false);

  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const searchByName = (e) => {
    e.preventDefault();
    dispatch(searchByNameAction(name));
    setsearchTest(true);
  };
  return (
    <>
      <form action="" onSubmit={searchByName}>
        <input
          type="text"
          placeholder="Search by name &#xF002;"
          className="search"
          style={{ fontFamily: "Arial, FontAwesome" }}
          onChange={(e) => setname(e.target.value)}
        />
      </form>
      <Link to="/home">Home</Link>

      {auth.isAuth ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="" onClick={() => dispatch(logOut())}>
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </>
  );
};

export default NavBar;
