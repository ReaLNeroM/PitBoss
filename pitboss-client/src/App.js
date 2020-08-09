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

    fullNameChanged(event) {
        this.setState({
            fullName: event.target.value
        });
    }
    dormAndRoomChanged(event) {
        this.setState({
            dormAndRoom: event.target.value
        });
    }
    foodStationChanged(event) {
        this.setState({
            foodStation: event.target.value
        })
    }
    orderNumberChanged(event) {
        this.setState({
            orderNumber: event.target.value
        });
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
                                apiUrl={process.env.API_URL} />}
                        exact />
                    <Route
                        path="/all-requests"
                        render={() =>
                            <RequestsPanel
                                apiUrl={process.env.API_URL} />}
                        exact />
                    <Route
                        path="/ask-for-delivery"
                        render={() =>
                        <div id="deliveryForm">
                            <FoodDeliveryForm
                                onFullNameChange={this.fullNameChanged.bind(this)}
                                fullName={this.state.fullName}
                                onDormAndRoomChange={this.dormAndRoomChanged.bind(this)}
                                dormAndRoom={this.state.dormAndRoom}
                                onFoodStationChange={this.foodStationChanged.bind(this)}
                                foodStation={this.state.foodStation}
                                onOrderNumberChange={this.orderNumberChanged.bind(this)}
                                orderNumber={this.state.orderNumber} />
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
