import React from 'react';
import Modal from 'react-bootstrap/Modal';

function validateRequest(registerData){
    if(registerData.schemaVersion.trim() === ''){
        return 'Schema version is empty';
    } else if(!registerData.fullName.trim().includes(' ')){
        return 'Please enter full name';
    } else if(!registerData.email.includes('@u.rochester.edu')){
        return 'Please enter valid e-mail (must contain @u.rochester.edu)';
    } else if(!registerData.password.length > 6){
        return 'Please enter a secure password (6 characters or above)'
    }

    return '';
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            hasAllergy: false,
            error: null,
            onLoginChange: props.onLoginChange,
            registerModalShow: props.registerModalShow,
            registerModalChange: props.registerModalChange
        };
    }

    componentDidUpdate(prevProps) {
        const { registerModalShow: oldRegisterModalShow } = prevProps;
        const { registerModalShow } = this.props;

        if (registerModalShow !== oldRegisterModalShow) {
            this.setState({ registerModalShow: registerModalShow });
        }
    }

    allergyChanged(event) {
        this.setState({
            hasAllergy: event.target.checked
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { apiUrl, hasAllergy, registerModalChange, onLoginChange } = this.state;

        const formData = new FormData(event.target);

        const schemaVersion = 'user.1';
        const fullName = formData.get('fullName');
        const dormAndRoom = formData.get('dormAndRoom');
        const email = formData.get('email');
        var allergies = formData.get('allergies');
        if (allergies === null){
            allergies = "";
        }

        const password = formData.get('password');
        const passwordRepeat = formData.get('password-repeat');

        const registerData = {
            schemaVersion,
            fullName,
            dormAndRoom,
            email,
            password,
            hasAllergy,
            allergies
        };

        const validationError =
            (password !== passwordRepeat) ?
                "Passwords do not match" :
                validateRequest(registerData);

        if(validationError === ''){
            fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(registerData),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response =>
                response.json()
                    .then(data => {
                        if(response.status === 200){
                            registerModalChange(false);
                            this.setState({
                                error: null,
                                registerModalShow: false
                            });
                            console.log(`Logged in as ${data.userId}`);
                            onLoginChange({
                                isLoggedIn: true,
                                userId: data.userId
                            });
                        } else {
                            this.setState({
                                error: `${response.status} Error: ${data.message}`
                            });
                        }
                    })
            );
        } else {
            this.setState({
                error: `Error: ${validationError}.`
            });
        }
    }

    render() {
        const { registerModalShow, hasAllergy, error } = this.state;
        const registerModalChange = this.state.registerModalChange.bind(this);
        const allergyChanged = this.allergyChanged.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <Modal show={registerModalShow}>
                <Modal.Header>
                    <h5 className="modal-title" id="registerModalLabel">Register an account</h5>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {error !== null &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>}
                        <div className="form-group">
                            <input type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name"
                            required />
                        </div>
                        <div className="form-group">
                            <input type="text"
                            className="form-control"
                            id="dormAndRoom"
                            name="dormAndRoom"
                            placeholder="Dorm and Room"
                            required />
                        </div>
                        <div className="form-group">
                            <input type="email"
                            className="form-control"
                            id="register-email"
                            name="email"
                            placeholder="email@u.rochester.edu"
                            autoComplete="username"
                            required />
                        </div>
                        <div className="form-group">
                            <input type="password"
                            className="form-control"
                            id="register-password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required />
                        </div>
                        <div className="form-group">
                            <input type="password"
                            className="form-control"
                            id="register-password-repeat"
                            name="password-repeat"
                            placeholder="Password (confirm)"
                            autoComplete="new-password"
                            required />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                defaultChecked={hasAllergy}
                                onChange={allergyChanged}
                                className="form-check-input"
                                id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Any allergies?</label>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                id="allergies"
                                name="allergies"
                                placeholder="Allergies"
                                disabled={hasAllergy ? "" : "disabled"}
                                required={hasAllergy ? "required" : ""} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            onClick={registerModalChange}
                            className="btn btn-secondary"
                            data-dismiss="modal">
                            Close
                        </button>
                        <button
                            type="submit"
                            id="registerButton"
                            className="btn btn-primary">
                            Register
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default RegisterForm;