import React, { useState, useEffect } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ history, match }) => {
  const [userState, setuserState] = useState("Client");
  const [info, setInfo] = useState({
    email: "",
    password: "",
    state: "Client",
  });
  const [errors, seterrors] = useState(null);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // handle state admin
    if (match.path === "/loginAdmin") {
      setInfo({ ...info, state: "Admin" });
    }
    if (auth.isAuth === true && info.state !== "Admin") {
      history.push("/profile");
    } else if (auth.isAuth === true && info.state === "Admin") {
      history.push("/admin");
    }
    if (auth.errors) {
      seterrors(auth.errors);
    }
  }, [auth.isAuth, auth.errors, match.path]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  //to dispatch the login action
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(info));
  };

  // Change the state of the user
  const handleUserState = () => {
    if (userState === "Client") {
      setuserState("Artisan");
      setInfo({ ...info, state: "Artisan" });
    } else {
      setuserState("Client");
      setInfo({ ...info, state: "Client" });
    }
  };

  return (
    <div className="container_login">
      <form
        className="form_login"
        onSubmit={handleLogin}
        onFocus={() => seterrors(null)}
      >
        {match.path !== "/loginAdmin" && (
          <button type="button" onClick={handleUserState}>
            {userState}
          </button>
        )}
        <div>
          <input
            className="browser-default"
            type="email"
            name="email"
            onChange={handleChange}
            required
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
        <button
          className="waves-effect waves-light btn"
          style={{ borderRadius: 8 }}
          type="submit"
        >
          Login
        </button>
        {errors && <h6 style={{ color: "red", marginTop: 20 }}>{errors}</h6>}
      </form>
    </div>
  );
};

export default Login;
