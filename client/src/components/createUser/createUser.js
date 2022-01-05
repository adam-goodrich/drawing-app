import React, { useState } from "react";
import axios from "axios";

const CreateUser = (props) => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const createNewUser = () => {
    if (user.email === "") {
      return;
    } else if (user.username === "") {
      return;
    } else if (user.password === "") {
      return;
    } else if (user.firstname === "") {
      return;
    } else if (user.lastname === "") {
      return;
    } else if (user.email.includes("@") === false) {
      return;
    } else if (user.email.includes(".") === false) {
      alert("Please enter a valid email address");
      return;
    } else if (user.username.length < 3) {
      return;
    }
    axios.post("http://localhost:8080/users", user).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="container mt-2 mb-3 ">
      <h1 className="mt-4 text-center">Sign-up!</h1>
      <form className="m-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="registrationNum"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            value={user.email}
            required
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
            value={user.username}
            required
            onChange={(e) => {
              setUser({
                ...user,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="emailHelp"
            placeholder="Enter Password"
            value={user.password}
            required
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="First Name"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            value={user.firstname}
            required
            onChange={(e) => {
              setUser({
                ...user,
                firstname: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="Last Name"
            aria-describedby="emailHelp"
            placeholder="Enter Last Name"
            value={user.lastname}
            required
            onChange={(e) => {
              setUser({
                ...user,
                lastname: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3 row">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={createNewUser}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
