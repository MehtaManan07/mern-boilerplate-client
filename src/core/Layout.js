import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
  const nav = () => (
    <ul className="nav p-3 nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" to="/"> Home </Link>
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
