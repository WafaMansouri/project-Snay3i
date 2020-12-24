import React, { useState, useEffect } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from "../actions/authActions";
const Login = ({ history, match }) => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    state: "Client",
  });
  const [errors, seterrors] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // handle state admin
    if (match.path === "/loginAdmin") {
      setInfo({ ...info, state: "Admin" });
    }
    if (auth.isAuth === true && info.state !== "Admin") {
      // console.log(window.location);
      // dispatch(loadClient());
      history.push("/profile");
      // history.goBack();
    } else if (auth.isAuth === true && info.state === "Admin") {
      history.push("/admin/messages");
    }
    if (auth.errors) {
      seterrors(auth.errors);
    }
  }, [auth.isAuth, auth, match.path]);
  useEffect(() => {
    if (!auth.isAuth && localStorage.getItem("token")) {
      auth.isAuth = true;
      // dispatch(loadClient());
      history.push("/profile");
    }
  }, [auth.isAuth]);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  //to dispatch the login action
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(info));
  };

  return (
    <div className="container_login">
      <form
        className="form_login login"
        onSubmit={handleLogin}
        onFocus={() => seterrors(null)}
      >
        <div className="grid_item_login">
          {match.path !== "/loginAdmin" && (
            <div className="login_radioGroup">
              <input
                onChange={handleChange}
                className="login_radio"
                // className="browser-default"
                type="radio"
                id="client"
                name="state"
                value="Client"
                defaultChecked
              />
              <label for="client" className="login_radioLabel">
                Client
              </label>
              <input
                onChange={handleChange}
                className="login_radio"
                type="radio"
                id="artisan"
                name="state"
                value="Artisan"
              />
              <label for="artisan" className="login_radioLabel">
                Artisan
              </label>
            </div>
          )}
          <div>
            <input
              className="browser-default"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="  &#xF0E0; Email "
              style={{ fontFamily: "Arial, FontAwesome" }}
            />
          </div>
          <div>
            <input
              className="browser-default"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="  &#xF023; Password"
              style={{ fontFamily: "Arial, FontAwesome" }}
            />
          </div>
          <div className="container_link_login">
            <a href="/register">New to Snay3i? Register here</a>
          </div>
          {errors && <h6 className="errorLogin">{errors}</h6>}
        </div>
        <div className="grid_item_login">
          <button className="waves-effect waves-light btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
