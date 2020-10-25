import React, { useState, useEffect } from "react";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ history, match }) => {
  // console.log(match.url);
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
  }, [auth.isAuth, auth.errors, info.state]);
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
    <form onSubmit={handleLogin} onFocus={() => seterrors(null)}>
      {match.path !== "/loginAdmin" && (
        <button type="button" onClick={handleUserState}>
          {userState}
        </button>
      )}
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button type="submit">Login</button>
      {errors && <h1>{errors}</h1>}
    </form>
  );
};

export default Login;
