import React from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";

const MyNavbar = (props) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          Drawing App! - Hello, {props.currentUser.firstname}!
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {props.currentAuthorizedUsers.map((user, index) => {
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
                <span key={user} className="mx-3">
                  {user}: {userColor}
                </span>
              );
            })}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
