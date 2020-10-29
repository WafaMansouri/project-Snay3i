import React from "react";
import "./App.css";
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
import ContactModal from "./pages/ContactModal";
import Notification from "./pages/Notification";

function App() {
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
          <Route exact path="/visit" component={VisitProfile} />
          <Route exact path="/contact" component={ContactModal} />
          <Route exact path="/notification" component={Notification} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
