import React from 'react';
import './RequestsPanel.css';

function toLocalDelta(timestamp) {
    return '15 minutes ago';
}

const RequestsPanel = (props) => {
    const { requests, haveRequestsLoaded } = props;
    const requestsList = requests.map((req) => (
        <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
           {req.location}
            <div className="d-flex align-items-center float-right">
                <div style={{marginRight: "1rem"}}>
                    {toLocalDelta(req.time)}
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
                <img src="loading.gif" alt="" />
            </div>
            <ul id="requests-list"
                className="list-group"
                style={haveRequestsLoaded ? {} : {display: 'none'}}>
                {requestsList}
            </ul>
        </div>
    );
}

export default RequestsPanel;
