import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            description: props.description
        };
    }

    render() {
        const { title } = this.state;
        const { location } = this.props;
        const tab = location.pathname.slice(1);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                <Link as={Link} className="navbar-brand" to="all-requests">{title}</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="basicExampleNav">
                    <ul className="navbar-nav mr-auto">
                        <li className={"nav-item " + ((tab === "all-requests" || tab === "") ? "active" : "")}>
                            <Nav.Link className="nav-link" as={Link} href="all-requests" to="all-requests">
                            Deliver!
                            </Nav.Link>
                        </li>
                        <li className={"nav-item " + (tab === "ask-for-delivery" ? "active" : "")}>
                            <Nav.Link className="nav-link" as={Link} href="ask-for-delivery" to="ask-for-delivery">
                                Ask for delivery
                            </Nav.Link>
                        </li>
                        <li className={"nav-item " + (tab === "my-deliveries" ? "active" : "")}>
                            <Nav.Link className="nav-link" as={Link} href="my-deliveries" to="my-deliveries">
                            My deliveries
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
                                aria-expanded="true">
                                <i className="fas fa-user" />
                                Profile
                            </div>
                            <div
                                className="dropdown-menu dropdown-menu-right dropdown-info"
                                aria-labelledby="navbarDropdownMenuLink-4">
                                <div className="dropdown-item waves-effect waves-light" data-toggle="modal" data-target="#exampleModal">
                                    Register
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);