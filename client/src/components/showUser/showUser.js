import axios from "axios";
import { useState, useEffect } from "react";
import OpenDrawing from "../OpenDrawing";
import NewDrawing from "../NewDrawing";

const ShowUser = (props) => {
  const [drawings, setDrawings] = useState([]);
  const [clickedOpen, setClickedOpen] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);
  const [drawingTitle, setDrawingTitle] = useState("");
  const [selectFormUser, setSelectFormUser] = useState("Select a user");
  const [currentAuthorizedUsers, setCurrentAuthorizedUsers] = useState([]);
  const [activeDrawing, setActiveDrawing] = useState(null);

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

  const clickOpenHandler = (id) => {
    setClickedOpen(true);
    drawingsToDisplay.forEach((drawing) => {
      if (drawing._id === id) {
        setActiveDrawing(drawing);
        setCurrentAuthorizedUsers(drawing.usersWithAccess);
      }
    });
  };

  const deleteDrawing = (id) => {
    axios.delete(`http://localhost:8080/drawings/${id}`).then((response) => {
      window.location.reload(false);
    });
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
      alert("Drawing saved!");
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
        alert("Drawing updated!");
      });
  };

  const handleSelectChange = (e) => {
    setSelectFormUser(e.target.value);
  };

  const addUsersWithAccess = () => {
    if (selectFormUser === "Select a user") {
      return;
    }
    setCurrentAuthorizedUsers([...currentAuthorizedUsers, selectFormUser]);
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

  if (clickedOpen) {
    return (
      <OpenDrawing
        activeDrawing={activeDrawing}
        setActiveDrawing={setActiveDrawing}
        drawing={activeDrawing}
        setClickedOpen={setClickedOpen}
        setClickedNew={setClickedNew}
        setDrawingTitle={setDrawingTitle}
        setCurrentAuthorizedUsers={setCurrentAuthorizedUsers}
        currentAuthorizedUsers={currentAuthorizedUsers}
        updateDrawing={updateDrawing}
        removeUser={removeUser}
        handleSelectChange={handleSelectChange}
        addUsersWithAccess={addUsersWithAccess}
        userList={props.userList}
        setUserList={props.setUserList}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
    );
  }

  if (clickedNew) {
    return (
      <NewDrawing
        activeDrawing={activeDrawing}
        setActiveDrawing={setActiveDrawing}
        drawing={activeDrawing}
        setClickedOpen={setClickedOpen}
        setClickedNew={setClickedNew}
        setDrawingTitle={setDrawingTitle}
        setCurrentAuthorizedUsers={setCurrentAuthorizedUsers}
        currentAuthorizedUsers={currentAuthorizedUsers}
        updateDrawing={updateDrawing}
        removeUser={removeUser}
        handleSelectChange={handleSelectChange}
        addUsersWithAccess={addUsersWithAccess}
        userList={props.userList}
        setUserList={props.setUserList}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        saveCanvas={saveCanvas}
      />
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
