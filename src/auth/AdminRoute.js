import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuth().role === 'admin' ? (
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

export default AdminRoute;
