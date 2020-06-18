import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from 'jsonwebtoken'

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token
    let { name } = jwt.decode(token)
    // console.log(token)
    if(token) {
      setValues({ ...values, name, token })
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_PROXY}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACTIVATION SUCCESS", response);
        setValues({
          ...values,
          name: "",
          show: false
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1> Hello, {name}, Please activate</h1>
      <button className="btn btn-outline-dark" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">ACTIVATE ACCOUNT</h1>
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
