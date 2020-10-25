import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
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
    </div>
  );
};

export default NavBar;
