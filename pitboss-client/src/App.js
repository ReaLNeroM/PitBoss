import React, { Component } from 'react';
import NavBar from './NavBar';
import FoodDeliveryForm from './FoodDeliveryForm';
import MyDeliveriesPanel from './MyDeliveriesPanel';
import RequestsPanel from './RequestsPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiUrl: process.env.REACT_APP_API_URL,
            isLoggedIn: false,
            userId: null,
            loginModalShow: false,
            registerModalShow: false
        };

        this.startSession = this.startSession.bind(this);
    }

    componentDidMount(){
        this.startSession();
    }

    async startSession(){
        const { apiUrl } = this.state;

        fetch(`${apiUrl}/auth/start-session`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    isLoggedIn: true,
                    userId: data.userId
                });
            })
            .catch(err => {});
    }

    sendInfoNotification(event){
        NotificationManager.info(event);
    }

    onLoginChange(event){
        if(event.isLoggedIn === true){
            this.sendInfoNotification('Logged in!');
        } else {
            this.sendInfoNotification('Logged out.');
        }

        this.setState({
            isLoggedIn: event.isLoggedIn,
            userId: event.userId
        });
    }

    loginModalChange(event){
        if(typeof event === "boolean"){
            this.setState({
                loginModalShow: event
            });
        } else if(typeof event.target.value === "string"){
            this.setState({
                loginModalShow: (event.target.value === "true")
            });
        } else {
            throw new Error("Could not change login modal value.");
        }
    }

    registerModalChange(event){
        if(typeof event === "boolean"){
            this.setState({
                registerModalShow: event
            });
        } else if(typeof event.target.value === "string"){
            this.setState({
                registerModalShow: (event.target.value === "true")
            });
        } else {
            throw new Error("Could not change register modal value.");
        }
    }

    render() {
        const { isLoggedIn, userId, apiUrl, loginModalShow, registerModalShow } = this.state;
        const onLoginChange = this.onLoginChange.bind(this);
        const loginModalChange = this.loginModalChange.bind(this);
        const sendInfoNotification = this.sendInfoNotification.bind(this);
        const registerModalChange = this.registerModalChange.bind(this);

        return (
            <div id="App" className="container">
                <Router basename={process.env.PUBLIC_URL}
                        hashType="noslash">
                    <NotificationContainer />

                    <div id="navBar">
                        <NavBar
                            apiUrl={apiUrl}
                            title="PitBoss"
                            onLoginChange={onLoginChange}
                            isLoggedIn={isLoggedIn}
                            loginModalChange={loginModalChange}
                            registerModalChange={registerModalChange} />
                    </div>


                    <RegisterForm
                        apiUrl={apiUrl}
                        onLoginChange={onLoginChange}
                        registerModalShow={registerModalShow}
                        registerModalChange={registerModalChange} />
                    <LoginForm
                        apiUrl={apiUrl}
                        onLoginChange={onLoginChange}
                        loginModalShow={loginModalShow}
                        loginModalChange={loginModalChange} />

                    <Switch>
                        <Route exact path="/" >
                            <RequestsPanel
                                apiUrl={apiUrl} />
                        </Route>
                        <Route
                            exact path="/all-requests"
                            render={() =>
                                    <RequestsPanel
                                        apiUrl={apiUrl} />} />
                        <Route
                            exact path="/ask-for-delivery"
                            render={() =>
                                <div id="deliveryForm">
                                    <FoodDeliveryForm
                                        apiUrl={apiUrl}
                                        isLoggedIn={isLoggedIn}
                                        userId={userId}
                                        sendInfoNotification={sendInfoNotification} />
                                </div>} />
                        <Route
                            exact path="/my-deliveries"
                            render={() =>
                                <div id="myDeliveriesPanel">
                                    <MyDeliveriesPanel
                                        apiUrl={apiUrl} />
                                </div>} />
                        <Route
                            render={() =>
                                <div id="error">
                                    <h4 class="alert alert-danger mb-0" role="alert">
                                        404 error: Page not found.
                                    </h4>
                                </div>} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
