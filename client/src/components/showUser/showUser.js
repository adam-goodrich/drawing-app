import axios from "axios";
import { useState, useEffect } from "react";
import { Canvas } from "../Canvas";
import { ClearCanvasButton } from "../ClearCanvasButton";
import { CanvasProvider } from "../CanvasContext";
import MyNavbar from "../Navbar";

const ShowUser = (props) => {
  const [drawings, setDrawings] = useState([]);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);
  const [drawingTitle, setDrawingTitle] = useState("");
  const [selectFormUser, setSelectFormUser] = useState("Select a user");
  const [currentAuthorizedUsers, setCurrentAuthorizedUsers] = useState([]);
  const [activeDrawing, setActiveDrawing] = useState(null);

  const deleteDrawing = (id) => {
    axios.delete(`http://localhost:8080/drawings/${id}`).then((response) => {
      window.location.reload(false);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/drawings").then((response) => {
      setDrawings(response.data);
    });
  }, []);

  useEffect(() => {
    props.setCurrentUser({
      ...props.currentUser,
      drawings: drawings,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawings]);

  let drawingsToDisplay = props.currentUser.drawings.map((drawing) => {
    if (drawing.usersWithAccess.includes(props.currentUser.username)) {
      return drawing;
    }
    return null;
  });
  drawingsToDisplay = drawingsToDisplay.filter((n) => n);

  const logout = () => {
    localStorage.setItem("userLoggedIn", "false");
    props.setUserLoggedIn(false);
    localStorage.setItem("currentUser", JSON.stringify({}));
    props.setShowMainModal(false);
    props.setShowCreateUserModal(false);
    setClickedNew(false);
  };

  const clickOpenHandler = (id) => {
    setClickedOpen(true);
    drawingsToDisplay.forEach((drawing) => {
      if (drawing._id === id) {
        setActiveDrawing(drawing);
        setCurrentAuthorizedUsers(drawing.usersWithAccess);
      }
    });
  };

  const clickNewHandler = () => {
    setClickedNew(true);
    setActiveDrawing({
      title: "",
      description: "",
      usersWithAccess: [props.currentUser.username],
      image: "",
    });
    setCurrentAuthorizedUsers([props.currentUser.username]);
  };

  const saveCanvas = () => {
    const canvas = document.getElementById("canvas");
    const imageData = canvas.toDataURL();

    const drawing = {
      createdBy: props.currentUser.firstname + " " + props.currentUser.lastname,
      image: imageData,
      title: drawingTitle,
      usersWithAccess: [...currentAuthorizedUsers],
    };
    axios.post("http://localhost:8080/drawings", drawing).then((response) => {
      window.location.reload(false);
    });
  };

  const updateDrawing = (id) => {
    const canvas = document.getElementById("canvas");
    const imageData = canvas.toDataURL();
    const drawing = {
      ...activeDrawing,
      image: imageData,
      usersWithAccess: [...currentAuthorizedUsers],
    };
    axios
      .put(`http://localhost:8080/drawings/${id}`, drawing)
      .then((response) => {
        window.location.reload(false);
      });
  };

  const addUsersWithAccess = () => {
    if (selectFormUser === "Select a user") {
      return;
    }
    setCurrentAuthorizedUsers([...currentAuthorizedUsers, selectFormUser]);
  };

  const handleSelectChange = (e) => {
    setSelectFormUser(e.target.value);
  };

  const removeUser = (username) => {
    if (props.currentUser.username === username) {
      alert("You cannot remove yourself from the list of authorized users");
    } else {
      const newUsersWithAccess = activeDrawing.usersWithAccess.filter(
        (user) => user !== username
      );
      setCurrentAuthorizedUsers(newUsersWithAccess);
    }
  };

  useEffect(() => {
    const drawing = {
      ...activeDrawing,
      usersWithAccess: [...currentAuthorizedUsers],
    };
    setActiveDrawing(drawing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAuthorizedUsers]);

  const addUserBtn = document.getElementById("addUserBtn");
  try {
    if (activeDrawing.usersWithAccess.length === 5) {
      addUserBtn.disabled = true;
    } else {
      addUserBtn.disabled = false;
    }
  } catch (error) {
    //pass
  }

  if (clickedOpen) {
    let renderThisDrawing = activeDrawing;
    return (
      <div>
        <MyNavbar
          currentAuthorizedUsers={currentAuthorizedUsers}
          currentUser={props.currentUser}
        />

        <div className="container mt-5 mb-5">
          <div className="row">
            <h1>{renderThisDrawing.title}</h1>
          </div>
          <div className=" mt-4">
            <label className="col-sm-2 col-form-label">
              Collaborators:
              {activeDrawing.usersWithAccess.map((user, index) => {
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
                      onClick={() => removeUser(user)}
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
              value={selectFormUser}
              onChange={handleSelectChange}
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
                addUsersWithAccess(selectFormUser);
              }}>
              Add User
            </button>
          </div>
        </div>
        <CanvasProvider>
          <Canvas
            activeDrawing={activeDrawing}
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
          <br></br>
          <button
            onClick={() => updateDrawing(activeDrawing._id)}
            className="btn btn-success me-3 mb-5 mt-3">
            Update
          </button>
          <ClearCanvasButton />
          <button
            className="btn btn-warning ms-3 mb-5 mt-3"
            onClick={() => {
              setClickedOpen(false);
              setActiveDrawing({});
            }}>
            Main Menu
          </button>
        </CanvasProvider>
      </div>
    );
  }

  if (clickedNew) {
    let renderThisDrawing = activeDrawing;

    return (
      <div>
        <MyNavbar
          currentAuthorizedUsers={currentAuthorizedUsers}
          currentUser={props.currentUser}
        />

        <div className="container mt-5 mb-5">
          <div className="row">
            <label className="col-sm-2 col-form-label">Drawing Name:</label>
            <input
              type="text"
              placeholder="Drawing Title"
              className="form-control"
              value={drawingTitle}
              onChange={(e) => {
                setDrawingTitle(e.target.value);
              }}
            />
          </div>
          <div className="row card mt-4">
            <label className="col-sm-2 col-form-label">
              Collaborators: <br></br>
              {renderThisDrawing.usersWithAccess.map((user, index) => {
                return (
                  <span className="badge bg-secondary m-2 ">
                    {user}
                    <button
                      onClick={() => removeUser(user)}
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
              value={selectFormUser}
              onChange={handleSelectChange}
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
              className="btn btn-warning mt-3"
              onClick={() => addUsersWithAccess(selectFormUser)}>
              Add User
            </button>
          </div>
        </div>
        <CanvasProvider>
          <Canvas
            activeDrawing={activeDrawing}
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
            onClick={saveCanvas}
            className="btn btn-success me-3 mb-5 mt-3">
            Save
          </button>
          <ClearCanvasButton />
          <button
            className="btn btn-warning ms-3 mb-5 mt-3"
            onClick={() => {
              setClickedNew(false);
              setActiveDrawing({});
            }}>
            Main Menu
          </button>
        </CanvasProvider>
      </div>
    );
  }

  return (
    <div className="container card mt-3 mb-5">
      <h1 className="m-3">Hello, {props.currentUser.firstname}!</h1>
      <button className="btn btn-danger m-3 mb-2" onClick={() => logout()}>
        Logout
      </button>
      <button className="btn btn-success m-3 mb-5" onClick={clickNewHandler}>
        Create New Drawing
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Drawing Title</th>
            <th scope="col">Created By</th>
            <th scope="col">Open</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* display drawing information */}
          {drawingsToDisplay.map((drawing, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{drawing.title}</td>
                <td>{drawing.createdBy}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      clickOpenHandler(drawing._id);
                    }}>
                    open
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteDrawing(drawing._id);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
