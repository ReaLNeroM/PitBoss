import React from 'react';
import './RequestsPanel.css';
import axios from "axios";
import ago from "s-ago";

function toLocalDelta(timestamp) {
    const time = new Date(Date.parse(timestamp));
    return ago(time);
}

class RequestsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            requests: [],
            haveRequestsLoaded: false
        };

        this.getRequests = this.getRequests.bind(this);
    }

    componentDidMount() {
        this.getRequests();
    }

    async getRequests() {
        axios.get(`${this.state.apiUrl}/requests`)
            .then(response => response.data)
            .then(newRequests => this.setState({requests: newRequests, haveRequestsLoaded: true}));
    }

    render() {
        const { requests, haveRequestsLoaded } = this.state;
        const requestsList = requests.map((req) => (
            <li key={req._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
               {req.foodStation}
                <div className="d-flex align-items-center float-right">
                    <div style={{marginRight: "1rem"}}>
                        {toLocalDelta(req.created)}
                    </div>
                    <button className="float-right btn btn-dark">
                        Deliver!
                    </button>
                </div>
            </li>
        ));

        return (
            <div id="requests">
                <div id="load-requests"
                     style={haveRequestsLoaded ? {display: 'none'} : {}}>
                    <img src={process.env.PUBLIC_URL + "/loading.gif"} alt="Loading..." />
                </div>
                <ul id="requests-list"
                    className="list-group"
                    style={haveRequestsLoaded ? {} : {display: 'none'}}>
                    {requestsList}
                </ul>
            </div>
        );
    }
}

export default RequestsPanel;
