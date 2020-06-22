import React, { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: "Reset Password",
  });

  useEffect(() => {
      console.log(match)
      let token = match.params.token
      let { name } = jwt.decode(token)
      if(token) {
          setValues({ ...values, name, token })
      }
  },[])

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PROXY}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("Reset PWD SUCCESS", response);
        toast.success(response.data.message)
        setValues({ ...values, buttonText: "Updated" });
      })
      .catch((error) => {
        console.log("Reset PWD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset Password" });
      });
  };

  const ResetPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          placeholder="New password..."
          required
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-dark" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">RESET PASSWORD</h1>
        {ResetPasswordForm()}
      </div>
      </Layout>
  );
};

export default Reset;
