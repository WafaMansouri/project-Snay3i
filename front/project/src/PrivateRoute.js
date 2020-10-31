import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          auth.isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={rest.path === "/profile" ? "/login" : "/loginAdmin"}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
