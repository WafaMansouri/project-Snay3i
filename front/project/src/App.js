import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import { useSelector } from "react-redux";

function App() {
  const search = useSelector((state) => state.search);
  // const [test, settest] = useState(false);
  // useEffect(() => {
  //   settest(search.test);
  //   console.log(test);
  // }, [search.test]);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/loginAdmin" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/admin" state="Admin" component={Admin} />
          <Route
            exact
            path="/profile"
            render={() =>
              !search.test ? <Profile /> : <Redirect to="/search" />
            }
          />
          <Route
            exact
            path="/search"
            render={() =>
              search.test ? <Search /> : <Redirect to="/profile" />
            }
          />
          {/* <Route exact path="/search" component={Search} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
