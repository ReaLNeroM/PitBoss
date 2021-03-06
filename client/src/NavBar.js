import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, withRouter } from "react-router-dom";

function toPrettyTabName(tab) {
  if (tab === "all-requests" || tab === "") {
    return "Deliver!";
  }
  if (tab === "ask-for-delivery") {
    return "Request";
  }
  if (tab === "my-deliveries") {
    return "My history";
  }
  return "";
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: props.apiUrl,
      title: props.title,
      isLoggedIn: props.isLoggedIn,
      onLoginChange: props.onLoginChange,
      loginModalChange: props.loginModalChange.bind(this),
      registerModalChange: props.registerModalChange.bind(this),
    };
  }

  componentDidUpdate(prevProps) {
    const { title: oldTitle, isLoggedIn: oldIsLoggedin } = prevProps;
    const { title, isLoggedIn } = this.props;

    if (title !== oldTitle || isLoggedIn !== oldIsLoggedin) {
      this.setState({ title, isLoggedIn });
    }
  }

  async doLogout() {
    fetch(`${this.state.apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        this.state.onLoginChange({
          isLoggedIn: false,
          userId: null,
        })
      );
  }

  render() {
    const {
      title,
      isLoggedIn,
      loginModalChange,
      registerModalChange,
    } = this.state;
    const { location } = this.props;
    const doLogout = this.doLogout.bind(this);
    const tab = location.pathname.slice(1);
    const prettyTabName = toPrettyTabName(tab);

    return (
      <nav className="navbar navbar-expand-lg navbar-dark primary-color">
        <Link as={Link} className="navbar-brand" to="all-requests">
          {title}
        </Link>

        <div
          className="navbar-toggler"
          data-toggle="collapse"
          aria-expanded="false"
        >
          {prettyTabName}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${
                tab === "all-requests" || tab === "" ? "active" : ""
              }`}
            >
              <Nav.Link
                className="nav-link"
                as={Link}
                href="all-requests"
                to="all-requests"
              >
                Deliver!
              </Nav.Link>
            </li>
            <li
              className={`nav-item ${
                tab === "ask-for-delivery" ? "active" : ""
              }`}
            >
              <Nav.Link
                className="nav-link"
                as={Link}
                href="ask-for-delivery"
                to="ask-for-delivery"
              >
                Ask for delivery
              </Nav.Link>
            </li>
            <li
              className={`nav-item ${tab === "my-deliveries" ? "active" : ""}`}
            >
              <Nav.Link
                className="nav-link"
                as={Link}
                href="my-deliveries"
                to="my-deliveries"
              >
                My requests and deliveries
              </Nav.Link>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto mr-sm-2">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle waves-effect waves-light"
                id="navbarDropdownMenuLink-4"
                data-toggle="dropdown"
                aria-haspopup="true"
                href="#"
                aria-expanded="true"
              >
                <i className="fas fa-user" />
                {isLoggedIn ? "Profile" : "Not logged in"}
              </div>
              <div
                className="dropdown-menu dropdown-menu-right dropdown-info"
                aria-labelledby="navbarDropdownMenuLink-4"
              >
                {isLoggedIn === false && (
                  <div>
                    <button
                      value
                      className="dropdown-item waves-effect waves-light"
                      onClick={registerModalChange}
                    >
                      Register
                    </button>
                    <button
                      value
                      className="dropdown-item waves-effect waves-light"
                      onClick={loginModalChange}
                    >
                      Login
                    </button>
                  </div>
                )}
                {isLoggedIn === true && (
                  <div>
                    <button
                      id="openMyProfile"
                      className="dropdown-item waves-effect waves-light"
                    >
                      My profile
                    </button>
                    <button
                      className="dropdown-item waves-effect waves-light"
                      onClick={doLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
