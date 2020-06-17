import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const nav = () => (
    <ul className="nav p-3 nav-tabs bg-dark">
      <li className="nav-item">
        <a className="nav-link" href="/"> Home </a>
      </li>
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
