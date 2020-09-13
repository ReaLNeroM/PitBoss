import React from "react";
import { withRouter } from "react-router-dom";
import "./RequestsPanel.css";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import englishStrings from "./ShortStrings";

function toLocalDelta(timestamp) {
  const formatter = buildFormatter(englishStrings);
  const time = new Date(Date.parse(timestamp));
  return <TimeAgo date={time} formatter={formatter} />;
}

class RequestsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      requests: [],
      haveRequestsLoaded: false,
    };

    this.getRequests = this.getRequests.bind(this);
  }

  componentDidMount() {
    this.getRequests();
  }

  async getRequests() {
    const { apiUrl } = this.props;

    fetch(`${apiUrl}/get-requests`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((newRequests) =>
        this.setState({ requests: newRequests, haveRequestsLoaded: true })
      );
  }

  async handleDelivery(event) {
    const { apiUrl, isLoggedIn, userId, sendInfoNotification } = this.props;

    if (isLoggedIn !== true) {
      this.setState({
        error: `Error: Not logged in.`,
      });
      return;
    }

    const request = {
      deliverer: userId,
      requestId: event.target.value,
      status: "requested",
    };

    fetch(`${apiUrl}/deliver-request`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(request),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        response
          .json()
          .then((data) => {
            throw new Error(`Error: ${data.message}`);
          })
          .catch((error) =>
            this.setState({
              error,
            })
          );
      } else {
        response
          .json()
          .catch((error) =>
            this.setState({
              error,
            })
          )
          .then((data) => {
            sendInfoNotification("Delivery requested!");
            this.props.history.push("/my-deliveries");
          });
      }
    });
  }

  render() {
    const { requests, haveRequestsLoaded } = this.state;
    const handleDelivery = this.handleDelivery.bind(this);
    const requestsLength = requests.length;
    const requestsList = requests.map((req, index) => (
      <li
        key={req.requestId}
        className={`d-flex justify-content-between list-group-item ${
          index !== requestsLength - 1 ? "mb-2" : ""
        }`}
      >
        <div>
          {req.foodStation}
          <br />
          <br />
          {toLocalDelta(req.created)}
        </div>
        <div className="d-flex align-items-center">
          <button
            value={req.requestId}
            onClick={handleDelivery}
            className="btn btn-dark"
          >
            Deliver!
          </button>
        </div>
      </li>
    ));

    return (
      <div id="requests">
        <div
          id="load-requests"
          style={haveRequestsLoaded ? { display: "none" } : {}}
        >
          <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="Loading..." />
        </div>
        <ul
          id="requests-list"
          className="list-group"
          style={haveRequestsLoaded ? {} : { display: "none" }}
        >
          {requestsList}
        </ul>
      </div>
    );
  }
}

export default withRouter(RequestsPanel);
