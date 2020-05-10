import React from "react";

import { Navbar, NavbarBrand, Nav, NavItem, Container } from "react-bootstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

const AppNavbar = () => {
  // State Hooks
  const [isOpen, setIsOpen] = React.useState(false);

  // Toggle
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavItem>
                <RegisterModal />
              </NavItem>
              <NavItem>
                <LoginModal />
              </NavItem>
              <NavItem>
                <Logout />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
