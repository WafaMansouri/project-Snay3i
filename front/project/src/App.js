import React, { useEffect } from "react";
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
import ArtisanResponse from "./pages/ArtisanResponse";
import Requests from "./pages/Requests";
import { useDispatch, useSelector } from "react-redux";
import { checkRequest_artisan } from "./actions/artisanActions";
import { checkRequest_client } from "./actions/clientActions";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  //To Check if there is requests for the connected artisan
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Artisan") {
      dispatch(checkRequest_artisan());
    }
  }, [auth]);
  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth]);
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
          <Route exact path="/requests" component={Requests} />
          <Route
            exact
            path="/artisanResponse/:id_client"
            component={ArtisanResponse}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
