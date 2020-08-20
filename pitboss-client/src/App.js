import React, { Component } from 'react';
import NavBar from './NavBar';
import FoodDeliveryForm from './FoodDeliveryForm';
import MyDeliveriesPanel from './MyDeliveriesPanel';
import RequestsPanel from './RequestsPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: null
        };
    }

    onLoginChange(event){
        this.setState({
            isLoggedIn: event.isLoggedIn,
            userId: event.userId
        });
        console.log(event);
    }

    render() {
      const { isLoggedIn, userId } = this.state;
      const apiUrl = process.env.REACT_APP_API_URL;
      const onLoginChange = this.onLoginChange.bind(this);
      console.log(`App: ${isLoggedIn}`);
      
      return (
        <div id="App" className="container">
            <Router basename={process.env.PUBLIC_URL}
                    hashType="noslash">
                <div id="navBar">
                    <NavBar
                        title="PitBoss"
                        isLoggedIn={isLoggedIn} />
                </div>
                <RegisterForm
                    apiUrl={apiUrl}
                    onLoginChange={onLoginChange} />
                <LoginForm
                    apiUrl={apiUrl}
                    onLoginChange={onLoginChange} />
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
                                    apiUrl={apiUrl} />
                            </div>} />
                    <Route
                        exact path="/my-deliveries"
                        render={() =>
                            <div id="myDeliveriesPanel">
                                <MyDeliveriesPanel />
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
