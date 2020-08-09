import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const {title, description} = props;
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="all-requests">{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="all-requests">Deliver!</Nav.Link>
              <Nav.Link as={Link} to="ask-for-delivery">Ask for delivery!</Nav.Link>
              <Nav.Link as={Link} to="my-deliveries">My deliveries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="navbar-text">
            {description}
          </div>
        </Navbar>
    )
}

export default NavBar;