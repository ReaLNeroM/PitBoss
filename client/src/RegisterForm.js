import React from "react";
import Modal from "react-bootstrap/Modal";

function validateRequest(registerData) {
  if (registerData.schemaVersion.trim() === "") {
    return "Schema version is empty";
  }
  if (!registerData.fullName.trim().includes(" ")) {
    return "Please enter full name";
  }
  if (!registerData.email.includes("@u.rochester.edu")) {
    return "Please enter valid e-mail (must contain @u.rochester.edu)";
  }
  if (registerData.password.length < 8) {
    return "Please enter a secure password (8 characters or above)";
  }

  return "";
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAllergy: false,
      error: null,
    };
  }

  allergyChanged(event) {
    this.setState({
      hasAllergy: event.target.checked,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { hasAllergy } = this.state;
    const { apiUrl, registerModalChange, onLoginChange } = this.props;

    const formData = new FormData(event.target);

    const schemaVersion = "user.1";
    const fullName = formData.get("fullName");
    const dormAndRoom = formData.get("dormAndRoom");
    const email = formData.get("email");
    let allergies = formData.get("allergies");
    if (allergies === null) {
      allergies = "";
    }

    const password = formData.get("password");
    const passwordRepeat = formData.get("password-repeat");

    const registerData = {
      schemaVersion,
      fullName,
      dormAndRoom,
      email,
      password,
      hasAllergy,
      allergies,
    };

    const validationError =
      password !== passwordRepeat
        ? "Passwords do not match"
        : validateRequest(registerData);

    if (validationError === "") {
      fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registerData),
        headers: {
          "content-type": "application/json",
        },
      }).then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            registerModalChange(false);
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
    const { hasAllergy, error } = this.state;
    const { registerModalShow, registerModalChange } = this.props;
    const registerModalHide = () => registerModalChange(false);
    const allergyChanged = this.allergyChanged.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <Modal show={registerModalShow} onHide={registerModalHide} centered>
        <Modal.Header>
          <h5 className="modal-title" id="registerModalLabel">
            Register an account
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
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="dormAndRoom"
                name="dormAndRoom"
                placeholder="Dorm and Room"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="register-email"
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
                id="register-password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="register-password-repeat"
                name="password-repeat"
                placeholder="Password (confirm)"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                defaultChecked={hasAllergy}
                onChange={allergyChanged}
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Any allergies?
              </label>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="allergies"
                name="allergies"
                placeholder="Allergies"
                disabled={hasAllergy ? "" : "disabled"}
                required={hasAllergy ? "required" : ""}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={registerModalHide}
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              id="registerButton"
              className="btn btn-primary"
            >
              Register
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default RegisterForm;
