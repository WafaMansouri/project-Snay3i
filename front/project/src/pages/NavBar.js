import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import {
  searchByNameAction,
  searchByCategoryAction,
} from "../actions/clientActions";
import { useHistory } from "react-router-dom";
import { Badge } from "antd";
import { resetNotificationAction } from "../actions/resetNotificationAction";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const [classResponsive, setclassResponsive] = useState(false);
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
    <div className={classResponsive ? "navBar responsiveNav" : "navBar"}>
      <img src="/logo3.png" alt="logo" />
      <div className="container_searchBar">
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
      <div className="links">
        {auth.isAuth ? (
          <>
            <a
              className="icon_navbar"
              onClick={(e) => {
                e.preventDefault();
                setclassResponsive(!classResponsive);
              }}
            >
              <i class="fa fa-bars"></i>
            </a>
            {auth.user && auth.user.state !== "Admin" && (
              <Link
                onClick={(e) => setclassResponsive(!classResponsive)}
                to="/profile"
              >
                Profile
              </Link>
            )}
            {/* if the user is admin */}
            {auth.user && auth.user.state === "Admin" && (
              <Link
                to="/admin/messages"
                onClick={(e) => setclassResponsive(!classResponsive)}
              >
                Admin
              </Link>
            )}
            <Link
              to=""
              onClick={(e) => {
                setclassResponsive(!classResponsive);
                dispatch(logOut());
              }}
            >
              Logout
            </Link>
            {/* icon notification */}
            {auth.user && auth.user.state !== "Admin" && (
              //  auth.user.state === "Client" ? (
              <Link
                to={
                  auth.user.state === "Client"
                    ? "/requests-client"
                    : "/requests"
                }
                onClick={(e) => {
                  setclassResponsive(!classResponsive);
                  dispatch(resetNotificationAction());
                }}
              >
                <i class="medium material-icons">drafts</i>
                <Badge
                  size="small"
                  offset={[-3, -15]}
                  count={auth.user.notification}
                  showZero
                >
                  <span className="head-example" />
                </Badge>
              </Link>
            )}
          </>
        ) : (
          <>
            <a
              className="icon_navbar"
              onClick={(e) => {
                e.preventDefault();
                setclassResponsive(!classResponsive);
              }}
            >
              <i class="fa fa-bars"></i>
            </a>
            <Link to="/" onClick={(e) => setclassResponsive(!classResponsive)}>
              Home
            </Link>
            {/* <Link
              style={{ width: 140 }}
              to="/"
              onClick={(e) => setclassResponsive(!classResponsive)}
            >
              Contact Us
            </Link> */}
            <HashLink
              style={{ width: 140 }}
              smooth
              to="/#contact"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "instant", block: "center" })
              }
              onClick={(e) => setclassResponsive(!classResponsive)}
            >
              Contact Us
            </HashLink>

            <Link
              to="/login"
              onClick={(e) => setclassResponsive(!classResponsive)}
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={(e) => setclassResponsive(!classResponsive)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
