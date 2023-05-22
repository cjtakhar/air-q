import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './styles/nav.css';

function NavBar() {
  return (
    <Navbar className="navBar" expand="lg">
      <Navbar.Brand className="navBrand" href="/">Air Q</Navbar.Brand>
      <Navbar.Toggle className="navToggle" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="navCollapse" id="basic-navbar-nav">
        {/* <Nav className="nav-links">
          <Nav.Link className="nav-link" href="/account">Account</Nav.Link>
          <Nav.Link className="nav-link" href="/about">About</Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
