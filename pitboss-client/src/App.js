import React, { Component } from 'react';
import NavBar from './NavBar';
import FoodDeliveryForm from './FoodDeliveryForm';
import MyDeliveriesPanel from './MyDeliveriesPanel';
import RequestsPanel from './RequestsPanel';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

class App extends Component {
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
                        exact >
                        <RequestsPanel
                                    apiUrl={process.env.REACT_APP_API_URL} />
                    </Route>
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
                                <FoodDeliveryForm
                                    apiUrl={process.env.REACT_APP_API_URL} />
                            </div>}
                        exact />
                    <Route
                        path="/my-deliveries"
                        render={() =>
                            <div id="myDeliveriesPanel">
                                <MyDeliveriesPanel />
                            </div>}
                        exact />
                </Switch>
            </Router>
        </div>
      );
    }
}

export default App;
