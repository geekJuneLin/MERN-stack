import React from "react";
import { useSelector } from "react-redux";

import { Navbar, NavbarBrand, Nav, NavItem, Container } from "react-bootstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

const AppNavbar = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const user = useSelector((state) => state.authReducer.user);

  React.useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [isAuthenticated]);

  // State Hooks
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuth, setAuth] = React.useState(false);

  // Toggle
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // User links
  const userLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user && `Welcome, ${user.name}`}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  // Guest links
  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">{isAuth ? userLinks : guestLinks}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
