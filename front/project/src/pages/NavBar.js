import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import { searchByNameAction } from "../actions/clientActions";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const request_artisan = useSelector((state) => state.request_artisan);
  const [newRequest, setnewRequest] = useState(false);
  // useEffect(() => {
  //   if (request_artisan.requests) {
  //     if (request_artisan.requests.length) {
  //       let test = request_artisan.requests.find(
  //         (request) => request.state === "Send Request"
  //       );
  //       console.log(test);
  //       test !== undefined && setnewRequest(true);
  //     }
  //     console.log(newRequest);
  //   }
  // }, [request_artisan.requests]);
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
    <>
      <form onSubmit={searchByName}>
        <input
          value={name}
          type="text"
          placeholder="Search by name &#xF002;"
          className="search"
          style={{ fontFamily: "Arial, FontAwesome" }}
          onChange={(e) => setname(e.target.value)}
        />
      </form>
      <Link to="/">Home</Link>

      {auth.isAuth ? (
        <>
          <Link to="/profile">Profile</Link>
          {/* if the user is admin */}
          {auth.user && auth.user.state === "Admin" && (
            <Link to="/admin">Admin</Link>
          )}
          <Link to="" onClick={() => dispatch(logOut())}>
            Log Out
          </Link>
          {/* icon notification */}
          <Link to="/requests">
            <i class="fas fa-envelope-square"></i>
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
