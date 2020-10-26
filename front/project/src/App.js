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
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/loginAdmin" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/admin" state="Admin" component={Admin} />
          {/* <Route exact path="/search" component={Search} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
