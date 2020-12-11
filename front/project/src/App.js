import React from "react";
import "./App.css";
import "./css/ContactModal.css";
import "./css/Login.css";
import "./css/Requests.css";
import "./css/Home.css";
import "./css/Footer.css";
import "./css/NavBar.css";
import "./css/Search.css";
import "./css/Profile.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import VisitProfile from "./pages/VisitProfile";
import Requests from "./pages/Requests";
import RequestsClient from "./pages/RequestsClient";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/loginAdmin" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/search" render={() => <Search />} />
          <Route exact path="/visit" render={() => <VisitProfile />} />
          <PrivateRoute exact path="/requests" component={Requests} />
          <PrivateRoute
            exact
            path="/requests-client"
            component={RequestsClient}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
