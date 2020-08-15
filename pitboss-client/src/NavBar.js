import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: props.title,
        description: props.description,
        tab: ''
      };
  }

  render() {
    const {title, description, tab} = this.state;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
          <a className="navbar-brand" href="all-requests">PitBoss</a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Nav.Link className="nav-link" as={Link} to="all-requests">
                  Deliver!
                  {tab === "all-requests" && 
                    <span className="sr-only">(current)</span>}
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link className="nav-link" as={Link} to="ask-for-delivery">
                  Ask for delivery
                  {tab === "ask-for-delivery" && 
                    <span className="sr-only">(current)</span>}
               </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link className="nav-link" as={Link} to="my-deliveries">
                    My deliveries
                    {tab === "my-deliveries" && 
                      <span className="sr-only">(current)</span>}
                </Nav.Link>
              </li>
            </ul>

            <ul className="navbar-nav mr-auto mr-sm-2">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <i className="fas fa-user"></i> Profile </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                  <a className="dropdown-item waves-effect waves-light" href="#">My account</a>
                  <a className="dropdown-item waves-effect waves-light" href="#">Log out</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default NavBar;