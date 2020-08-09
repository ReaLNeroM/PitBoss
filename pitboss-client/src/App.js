import React, { Component } from 'react';
import NavBar from './NavBar';
import FoodDeliveryForm from './FoodDeliveryForm';
import MyDeliveriesPanel from './MyDeliveriesPanel';
import RequestsPanel from './RequestsPanel';
import FoodStation from './FoodStation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class App extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
            haveRequestsLoaded: false,
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
            <Router basename={process.env.PUBLIC_URL}>
                <div id="navBar">
                    <NavBar
                        title="PitBoss"
                        description="Help out and deliver food for students in quarantine! (UR only)" />
                </div>
                <Route
                    path="/"
                    render={() =>
                    <div id="deliveryForm">
                        <FoodDeliveryForm
                            id="deliveryForm"
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
                    path="/all-requests"
                    render={() =>
                        <RequestsPanel
                            requests={this.state.requests}
                            haveRequestsLoaded={this.state.haveRequestsLoaded} />}
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
                    render={MyDeliveriesPanel}
                    exact />
            </Router>
        </div>
      );
    }
}

export default App;
