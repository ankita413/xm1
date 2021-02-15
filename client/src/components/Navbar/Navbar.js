import React from "react";
import "./Navbar.css";
import { Container, Navbar } from "react-bootstrap";
const navbar = () => {
  return (
    <div>
      <Navbar expand="lg" id="nav">
        <Container>
          <Navbar.Brand href="#" id="brand">
            Xmeme
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default navbar;