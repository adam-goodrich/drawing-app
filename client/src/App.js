import React, { useState, useEffect } from "react";
import "./App.css";
import User from "./components/showUser/showUser.js";
import Create from "./components/createUser/createUser.js";
import Login from "./components/Login";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    drawings: [],
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((allUsers) => {
      setUserList(allUsers.data);
    });
    if (localStorage.getItem("userLoggedIn") === "true") {
      setUserLoggedIn(true);
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  const handleCloseCreateUser = () => {
    setShowCreateUserModal(false);
    setShowMainModal(false);
  };
  const handleShowCreateUser = () => setShowCreateUserModal(true);
  const handleShowMainModal = () => setShowMainModal(true);
  const handleCloseMainModal = () => setShowMainModal(false);

  if (userLoggedIn) {
    return (
      <div className="App">
        <div>
          <User
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userList={userList}
            setUserList={setUserList}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            showCreateUserModal={showCreateUserModal}
            setShowCreateUserModal={setShowCreateUserModal}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="d-flex align-items-center justify-content-center btn-container">
        <h1 className="mt-5 me-5">Drawing app</h1>
        <Button variant="primary mt-5 " onClick={handleShowMainModal}>
          Login
        </Button>
      </div>
      <Modal
        show={showCreateUserModal}
        onHide={handleCloseCreateUser}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userList={userList}
            setUserList={setUserList}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            showCreateUserModal={showCreateUserModal}
            setShowCreateUserModal={setShowCreateUserModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateUser}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showMainModal}
        onHide={handleCloseMainModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-5">
          <div className="d-flex align-items-center justify-content-center">
            <Login
              userLoggedIn={userLoggedIn}
              setUserLoggedIn={setUserLoggedIn}
              userList={userList}
              setUserList={setUserList}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              showCreateUserModal={showCreateUserModal}
              setShowCreateUserModal={setShowCreateUserModal}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleShowCreateUser}
            className="me-2">
            Create User
          </Button>
          <Button variant="secondary" onClick={handleCloseMainModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
