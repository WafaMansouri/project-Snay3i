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
import RequestsClient from "./pages/RequestsClient";
import AddPhoto from "./pages/AddPhoto";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import UpdateProfile from "./pages/UpdateProfile";
import Alert from "./pages/Alert";
function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  //To Check if there is requests for the connected artisan
  // useEffect(() => {
  //   if (auth.isAuth && auth.user && auth.user.state === "Artisan") {
  //     dispatch(checkRequest_artisan());
  //   }
  // }, [auth]);

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
          <Route exact path="/requests-client" component={RequestsClient} />
          <Route exact path="/addPhoto" component={AddPhoto} />
          <Route exact path="/update-profile" component={UpdateProfile} />
          <Route exact path="/alert/:id_post" component={Alert} />
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
