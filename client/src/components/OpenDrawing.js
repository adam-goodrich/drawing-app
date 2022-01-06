import React, { useEffect } from "react";
import MyNavbar from "./Navbar";
import Canvas from "./Canvas";
import { CanvasProvider } from "./CanvasContext";
import { ClearCanvasButton } from "./ClearCanvasButton";

const OpenDrawing = (props) => {
  useEffect(() => {
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
        activeDrawing={props.activeDrawing}
        drawing={props.activeDrawing}
        setClickedOpen={props.setClickedOpen}
        setClickedNew={props.setClickedNew}
        setDrawingTitle={props.setDrawingTitle}
        setCurrentAuthorizedUsers={props.setCurrentAuthorizedUsers}
        updateDrawing={props.updateDrawing}
        removeUser={props.removeUser}
        handleSelectChange={props.handleSelectChange}
        addUsersWithAccess={props.addUsersWithAccess}
        userList={props.userList}
        setUserList={props.setUserList}
        setCurrentUser={props.setCurrentUser}
      />

      <div className="container mt-5 mb-5">
        <div className="row">
          <h1>{props.activeDrawing.title}</h1>
        </div>
        <div className="mt-4">
          <label className="col-form-label me-2">Collaborators:</label>
          {props.activeDrawing.usersWithAccess.map((user, index) => {
            let userColor;
            if (index === 0) {
              userColor = <span>Black</span>;
            }
            if (index === 1) {
              userColor = <span>Red</span>;
            }
            if (index === 2) {
              userColor = <span>Green</span>;
            }
            if (index === 3) {
              userColor = <span>Blue</span>;
            }
            if (index === 4) {
              userColor = <span>Orange</span>;
            }
            return (
              <span key={index} className="badge bg-secondary m-2">
                {user}:{userColor}
                <button
                  onClick={() => props.removeUser(user)}
                  className="btn btn-danger btn-sm m-1 ms-2 p-0 px-1">
                  x
                </button>
              </span>
            );
          })}
        </div>
        <div className="row mt-3">
          <label className="col-form-label">Add Collaborator:</label>
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
            onClick={() => {
              props.addUsersWithAccess(props.selectFormUser);
            }}>
            Add User
          </button>
        </div>
      </div>
      <CanvasProvider>
        <div className="d-flex justify-content-center my-3">
          <button
            onClick={() => props.updateDrawing(props.activeDrawing._id)}
            className="btn btn-success me-3 mb-5 mt-3">
            Update
          </button>
          <ClearCanvasButton />
          <button
            className="btn btn-warning ms-3 mb-5 mt-3"
            onClick={() => {
              props.setClickedOpen(false);
              props.setActiveDrawing({});
            }}>
            Main Menu
          </button>
        </div>
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
      </CanvasProvider>
    </div>
  );
};

export default OpenDrawing;
