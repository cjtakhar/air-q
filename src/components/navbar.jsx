import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './styles/nav.css';

function NavBar() {
  return (
    <Navbar className="navBar" expand="lg">
      <Navbar.Brand className="navBrand" href="/air-q">Air Q</Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;
