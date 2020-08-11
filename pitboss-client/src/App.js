import React, { Component } from 'react';
import NavBar from './NavBar';
import FoodDeliveryForm from './FoodDeliveryForm';
import MyDeliveriesPanel from './MyDeliveriesPanel';
import RequestsPanel from './RequestsPanel';
import FoodStation from './FoodStation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
            haveRequestsLoaded: false,
            haveMyDeliveriesLoaded: false,
            fullName: '',
            dormAndRoom: '',
            foodStation: FoodStation.None,
            orderNumber: ''
        };
    }

    render() {
      return (
        <div id="App" className="container">
            <Router basename={process.env.PUBLIC_URL}
                    hashType="noslash">
                <div id="navBar">
                    <NavBar
                        title="PitBoss"
                        description="Help out and deliver food for students in quarantine! (UR only)" />
                </div>
                <Switch>
                    <Route
                        path="/"
                        render={() =>
                                <RequestsPanel
                                    apiUrl={process.env.REACT_APP_API_URL} />}
                            exact />
                    <Route
                        path="/all-requests"
                        render={() =>
                                <RequestsPanel
                                    apiUrl={process.env.REACT_APP_API_URL} />}
                            exact />
                    <Route
                        path="/ask-for-delivery"
                        render={() =>
                            <div id="deliveryForm">
                                <FoodDeliveryForm />
                            </div>}
                        exact />
                    <Route
                        path="/my-deliveries"
                        render={() =>
                            <div id="myDeliveriesPanel">
                                <MyDeliveriesPanel
                                    haveMyDeliveriesLoaded={this.state.myDeliveriesLoaded} />
                            </div>}
                        exact />
                </Switch>
            </Router>
        </div>
      );
    }
}

export default App;
