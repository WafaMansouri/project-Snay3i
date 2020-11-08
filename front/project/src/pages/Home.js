import React, { useEffect } from "react";
import { loadClient } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.isAuth || localStorage.getItem("token")) {
      dispatch(loadClient());
      history.push("/profile");
    }
  });
  return <div>Home Page</div>;
};

export default Home;
