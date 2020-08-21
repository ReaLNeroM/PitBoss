import React from 'react';
import './RequestsPanel.css';
import TimeAgo from 'react-timeago';
import englishStrings from './ShortStrings';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

function toLocalDelta(timestamp) {
    const formatter = buildFormatter(englishStrings);
    const time = new Date(Date.parse(timestamp));
    return <TimeAgo date={time} formatter={formatter} />;
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
        fetch(`${this.state.apiUrl}/requests`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(newRequests => this.setState({requests: newRequests, haveRequestsLoaded: true}));
    }

    render() {
        const { requests, haveRequestsLoaded } = this.state;
        const requestsLength = requests.length;
        const requestsList = requests.map((req, index) => (
            <li
                key={req._id}
                className={"list-group-item d-flex justify-content-between align-items-center " + ((index !== requestsLength - 1) ? "mb-2" : "")}>
               {req.foodStation}
                <div className="d-flex align-items-center float-right">
                    <div style={{marginRight: ".50rem"}}>
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
