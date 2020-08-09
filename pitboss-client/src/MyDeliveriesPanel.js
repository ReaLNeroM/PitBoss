import React from 'react';
import axios from "axios";
import './MyDeliveriesPanel.css';

class MyDeliveriesPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            apiUrl: props.apiUrl,
            myDeliveries: [],
            haveMyDeliveriesLoaded: false
        };

        this.getDeliveries = this.getDeliveries.bind(this);
    }

    componentDidMount() {
        this.getDeliveries();
    }

    async getDeliveries() {
        axios.get(`${this.state.apiUrl}/my_deliveries`)
            .then(response => response.data)
            .then(newMyDeliveries =>
                this.setState({myDeliveries: newMyDeliveries,
                               haveMyDeliveriesLoaded: true}))
            .catch(error => this.setState({error: error, haveMyDeliveriesLoaded: true}));
    }

    render() {
        const { error, myDeliveries, haveMyDeliveriesLoaded } = this.state;
        const myDeliveriesList = myDeliveries.map((req) => (
            <li key={req._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
               {req.foodStation}
                <div className="d-flex align-items-center float-right">
                    <div style={{marginRight: "1rem"}}>
                        {req.time}
                    </div>
                </div>
            </li>
        ));

        return (
            <div id="my-deliveries">
                <div id="load-my-deliveries"
                     style={haveMyDeliveriesLoaded ? {display: 'none'} : {}}>
                    <img src="loading.gif" alt="Loading..." />
                </div>
                <div id="error-my-deliveries"
                     className="alert alert-danger"
                     style={error === null ? {display: 'none'}: {}}>
                     An error has occured. Please try again.
                </div>
                <ul id="deliveries-list"
                    className="list-group"
                    style={haveMyDeliveriesLoaded ? {} : {display: 'none'}}>
                    {myDeliveriesList}
                </ul>
            </div>
        );
    }
}

export default MyDeliveriesPanel;
