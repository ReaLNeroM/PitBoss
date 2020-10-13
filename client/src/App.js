import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./NavBar";
import FoodDeliveryForm from "./FoodDeliveryForm";
import MyHistoryPanel from "./MyHistoryPanel";
import RequestsPanel from "./RequestsPanel";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      isLoggedIn: false,
      userId: null,
      loginModalShow: false,
      registerModalShow: false,
    };

    this.startSession = this.startSession.bind(this);
  }

  onLoginChange(event) {
    if (event.isLoggedIn === true) {
      this.sendInfoNotification("Logged in!");
    } else {
      this.sendInfoNotification("Logged out.");
    }

    this.setState({
      isLoggedIn: event.isLoggedIn,
      userId: event.userId,
    });
  }

  componentDidMount() {
    this.startSession();
  }

  sendInfoNotification(event) {
    NotificationManager.info(event);
  }

  async startSession() {
    const { apiUrl } = this.state;

    fetch(`${apiUrl}/auth/start-session`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json().then((data) => {
          if (response.ok) {
            this.setState({
              isLoggedIn: true,
              userId: data.userId,
            });
          } else {
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => {
        if (error.message !== "Not logged in.") {
          this.sendInfoNotification(`${error}. Try logging in again.`);
        }
      });
  }

  loginModalChange(event) {
    if (typeof event === "boolean") {
      this.setState({
        loginModalShow: event,
      });
    } else if (typeof event.target.value === "string") {
      this.setState({
        loginModalShow: event.target.value === "true",
      });
    } else {
      throw new Error("Could not change login modal value.");
    }
  }

  registerModalChange(event) {
    if (typeof event === "boolean") {
      this.setState({
        registerModalShow: event,
      });
    } else if (typeof event.target.value === "string") {
      this.setState({
        registerModalShow: event.target.value === "true",
      });
    } else {
      throw new Error("Could not change register modal value.");
    }
  }

  render() {
    const {
      isLoggedIn,
      userId,
      apiUrl,
      loginModalShow,
      registerModalShow,
    } = this.state;
    const onLoginChange = this.onLoginChange.bind(this);
    const loginModalChange = this.loginModalChange.bind(this);
    const sendInfoNotification = this.sendInfoNotification.bind(this);
    const registerModalChange = this.registerModalChange.bind(this);

    return (
      <div id="App" className="container">
        <Router basename={process.env.PUBLIC_URL} hashType="noslash">
          <NotificationContainer />

          <div id="navBar">
            <NavBar
              apiUrl={apiUrl}
              title="PitBoss"
              onLoginChange={onLoginChange}
              isLoggedIn={isLoggedIn}
              loginModalChange={loginModalChange}
              registerModalChange={registerModalChange}
            />
          </div>

          <RegisterForm
            apiUrl={apiUrl}
            onLoginChange={onLoginChange}
            registerModalShow={registerModalShow}
            registerModalChange={registerModalChange}
          />
          <LoginForm
            apiUrl={apiUrl}
            onLoginChange={onLoginChange}
            loginModalShow={loginModalShow}
            loginModalChange={loginModalChange}
          />

          <Switch>
            <Route exact path="/">
              <RequestsPanel
                apiUrl={apiUrl}
                isLoggedIn={isLoggedIn}
                sendInfoNotification={sendInfoNotification}
                userId={userId}
              />
            </Route>
            <Route
              exact
              path="/all-requests"
              render={() => (
                <RequestsPanel
                  apiUrl={apiUrl}
                  isLoggedIn={isLoggedIn}
                  sendInfoNotification={sendInfoNotification}
                  userId={userId}
                />
              )}
            />
            <Route
              exact
              path="/ask-for-delivery"
              render={() => (
                <div id="deliveryForm">
                  <FoodDeliveryForm
                    apiUrl={apiUrl}
                    isLoggedIn={isLoggedIn}
                    userId={userId}
                    sendInfoNotification={sendInfoNotification}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/my-deliveries"
              render={() => (
                <div id="myHistoryPanel">
                  <MyHistoryPanel apiUrl={apiUrl}
                                  userId={userId} />
                </div>
              )}
            />
            <Route
              render={() => (
                <div id="error">
                  <h4 className="alert alert-danger mb-0" role="alert">
                    404 error: Page not found.
                  </h4>
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
