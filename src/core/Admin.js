import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
const Admin = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get(`${process.env.REACT_APP_PROXY}/user/${isAuth()._id}`, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      })
      .then((response) => {
        console.log("Profile update:", response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, email, name });
      })
      .catch((error) => {
        console.log("Admin UPDATE ERROR:", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/signin");
          });
        }
      });
  };

  const { name, email, password, buttonText, role } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_PROXY}/admin/update`,
      headers: { Authorization: `Bearer ${getCookie("token")}` },
      data: { name, password },
    })
      .then((response) => {
        console.log("PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {});
        setValues({ ...values, buttonText: "Submitted" });
        toast.success(`Profile Updated Successfully!!`);
      })
      .catch((error) => {
        console.log("PROFILE UPDATE ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input disabled value={role} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input disabled value={email} type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
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
        <h1 className="p-5 text-center">PROFILE UPDATE</h1>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Admin;
