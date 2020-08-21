import React from 'react';
import { withRouter } from 'react-router-dom';

function validateRequest(loginData){
    if(!loginData.email.includes('@u.rochester.edu')){
        return 'Please enter valid e-mail (must contain @u.rochester.edu)';
    } else if(!loginData.password.length > 6){
        return 'Please enter a secure password (6 characters or above)'
    }

    return '';
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            error: null
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        const loginData = {
            email,
            password
        };

        const validationError = validateRequest(loginData);

        if(validationError === ''){
            fetch(`${this.state.apiUrl}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(loginData),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                response.json()
                    .then(data => {
                        if(response.status === 200){
                            this.setState({error: null});
                            console.log(`Logged in as ${data.userId}`);
                            this.props.onLoginChange({
                                isLoggedIn: true,
                                userId: data.userId
                            });
                        } else {
                            this.setState({error: `${response.status} Error: ${data.message}`});
                        }
                    })
            });
        } else {
            alert(`Error: ${validationError}.`);
        }
    }

    render() {
        const error = this.state.error;
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login to your account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {error !== null &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>}
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="email"
                                    className="form-control"
                                    id="loginEmail"
                                    name="email"
                                    placeholder="email@u.rochester.edu"
                                    required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    name="password"
                                    placeholder="Password"
                                    required />
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
                                    id="loginButton"
                                    className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);