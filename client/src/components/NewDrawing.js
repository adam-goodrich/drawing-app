import React from "react";
import MyNavbar from "./Navbar";
import Canvas from "./Canvas";
import { CanvasProvider } from "./CanvasContext";
import { ClearCanvasButton } from "./ClearCanvasButton";
import { useEffect } from "react";

const NewDrawing = (props) => {
  useEffect(() => {
    console.log(props.activeDrawing.usersWithAccess);
    const addUserBtn = document.getElementById("addUserBtn");
    try {
      if (props.activeDrawing.usersWithAccess.length === 5) {
        addUserBtn.disabled = true;
      } else {
        addUserBtn.disabled = false;
      }
    } catch (error) {
      //pass
    }
  }, [props.activeDrawing.usersWithAccess]);

  let renderThisDrawing = props.activeDrawing;

  return (
    <div>
      <MyNavbar
        currentAuthorizedUsers={props.currentAuthorizedUsers}
        currentUser={props.currentUser}
      />

      <div className="container mt-5 mb-5">
        <div className="row">
          <label className="col-sm-2 col-form-label">Drawing Name:</label>
          <input
            type="text"
            placeholder="Drawing Title"
            className="form-control"
            value={props.drawingTitle}
            onChange={(e) => {
              props.setDrawingTitle(e.target.value);
            }}
          />
        </div>
        <div className="row card mt-4">
          <label className="col-sm-2 col-form-label">
            Collaborators: <br></br>
            {renderThisDrawing.usersWithAccess.map((user, index) => {
              return (
                <span className="badge bg-secondary m-2 " key={user._id}>
                  {user}
                  <button
                    onClick={() => props.removeUser(user)}
                    className="btn btn-danger btn-sm ms-2">
                    X
                  </button>
                </span>
              );
            })}
          </label>
        </div>
        <div className="row mt-3">
          <label className="col-sm-2 col-form-label">Add Collaborator:</label>

          <select
            className="col-sm-10 form-select"
            value={props.selectFormUser}
            onChange={props.handleSelectChange}
            id="delectForm">
            <option value="">Select a user to add</option>
            {props.userList.map((user, index) => {
              if (user.username === props.currentUser.username) {
                return null;
              } else if (
                renderThisDrawing.usersWithAccess.includes(user.username)
              ) {
                return null;
              } else {
                let userFullName = user.firstname + " " + user.lastname;
                let userUsername = user.username;
                return (
                  <option
                    id={userUsername}
                    key={index + "key"}
                    value={userUsername}>
                    {userFullName}
                  </option>
                );
              }
            })}
          </select>
          <button
            id="addUserBtn"
            className="btn btn-warning mt-3"
            onClick={() => props.addUsersWithAccess(props.selectFormUser)}>
            Add User
          </button>
        </div>
      </div>
      <CanvasProvider>
        <Canvas
          activeDrawing={props.activeDrawing}
          userLoggedIn={props.userLoggedIn}
          setUserLoggedIn={props.setUserLoggedIn}
          userList={props.userList}
          setUserList={props.setUserList}
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
          showLoginModal={props.showLoginModal}
          setShowLoginModal={props.setShowLoginModal}
          showCreateUserModal={props.showCreateUserModal}
          setShowCreateUserModal={props.setShowCreateUserModal}
        />
        <button
          onClick={props.saveCanvas}
          className="btn btn-success me-3 mb-5 mt-3">
          Save
        </button>
        <ClearCanvasButton />
        <button
          className="btn btn-warning ms-3 mb-5 mt-3"
          onClick={() => {
            props.setClickedNew(false);
            props.setActiveDrawing({});
          }}>
          Main Menu
        </button>
      </CanvasProvider>
    </div>
  );
};

export default NewDrawing;
