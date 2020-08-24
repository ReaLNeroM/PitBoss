import React from "react";
import Modal from "react-bootstrap/Modal";

function validateRequest(loginData) {
  if (!loginData.email.includes("@u.rochester.edu")) {
    return "Please enter valid e-mail (must contain @u.rochester.edu)";
  }
  if (!loginData.password.length > 6) {
    return "Please enter a secure password (6 characters or above)";
  }

  return "";
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { apiUrl, onLoginChange } = this.props;
    const loginModalChange = this.props.loginModalChange.bind(this);
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const loginData = {
      email,
      password,
    };

    const validationError = validateRequest(loginData);

    if (validationError === "") {
      fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginData),
        headers: {
          "content-type": "application/json",
        },
      }).then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            loginModalChange(false);
            this.setState({
              error: null,
            });
            console.log(`Logged in as ${data.userId}`);
            onLoginChange({
              isLoggedIn: true,
              userId: data.userId,
            });
          } else {
            this.setState({
              error: `${response.status} Error: ${data.message}`,
            });
          }
        })
      );
    } else {
      this.setState({
        error: `Error: ${validationError}.`,
      });
    }
  }

  render() {
    const { error } = this.state;
    const { loginModalShow, loginModalChange } = this.props;
    const handleHide = () => loginModalChange(false);
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <Modal show={loginModalShow} onHide={handleHide} centered>
        <Modal.Header>
          <h5 className="modal-title" id="loginModalLabel">
            Login to your account
          </h5>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {error !== null && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                name="email"
                placeholder="email@u.rochester.edu"
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={loginModalChange}
              type="button"
              className="btn btn-secondary"
              value={false}
            >
              Close
            </button>
            <button type="submit" id="loginButton" className="btn btn-primary">
              Login
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default Login;
