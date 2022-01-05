import React from "react";

const Login = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    props.userList.forEach((person) => {
      if (person.username === props.currentUser.username) {
        console.log("found user");

        if (person.password === props.currentUser.password) {
          console.log("logged in");
          props.setUserLoggedIn(true);
          props.setCurrentUser(person);
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("currentUser", JSON.stringify(person));
        }
      }
    });
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              value={props.currentUser.username}
              onChange={(e) =>
                props.setCurrentUser({
                  ...props.currentUser,
                  username: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              value={props.currentUser.password}
              onChange={(e) =>
                props.setCurrentUser({
                  ...props.currentUser,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-3 row container ">
          <button type="submit" className="btn btn-primary btn-lg m-2 mt-3">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
