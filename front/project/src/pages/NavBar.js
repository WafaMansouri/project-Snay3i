import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import { searchByNameAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);

  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const searchByName = (e) => {
    e.preventDefault();
    dispatch(searchByNameAction(name));
    history.push("/search");
    setname("");
  };
  return (
    <div className="navBar">
      <img src="/logo-vert.png" width="80px" alt="logo" />
      <form className="search" onSubmit={searchByName}>
        <input
          value={name}
          type="text"
          placeholder="Search by name &#xF002;"
          className="search"
          style={{ fontFamily: "Arial, FontAwesome" }}
          onChange={(e) => setname(e.target.value)}
        />
      </form>
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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
