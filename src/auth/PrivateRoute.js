import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
