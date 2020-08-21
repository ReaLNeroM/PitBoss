import React from 'react';

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
            hasAllergy: false
        };
    }

    allergyChanged(event) {
        this.setState({
            hasAllergy: event.target.checked
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const schemaVersion = 'user.1';
        const fullName = formData.get('fullName');
        const dormAndRoom = formData.get('dormAndRoom');
        const email = formData.get('email');
        const hasAllergy = this.state.hasAllergy;
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
            fetch(`${this.state.apiUrl}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(registerData),
                headers: {
                    'content-type': 'application/json'
                }
            });
        } else {
            alert(`Error: ${validationError}.`);
        }
    }

    render() {
        const { hasAllergy } = this.state;
        const allergyChanged = this.allergyChanged.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registerModalLabel">Register an account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
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
                                    required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                    className="form-control"
                                    id="register-password"
                                    name="password"
                                    placeholder="Password"
                                    required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                    className="form-control"
                                    id="register-password-repeat"
                                    name="password-repeat"
                                    placeholder="Password (confirm)"
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
                                        disabled={this.state.hasAllergy ? "" : "disabled"}
                                        required={this.state.hasAllergy ? "required" : ""} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;