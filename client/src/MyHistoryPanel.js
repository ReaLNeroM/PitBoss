import React from "react";
import "./RequestModal";
import "./MyHistoryPanel.css";
import RequestModal from "./RequestModal";
import TimeAgo from "react-timeago";

function toLocalDelta(timestamp) {
  const time = new Date(Date.parse(timestamp));
  return <TimeAgo date={time} />;
}

class MyHistoryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      myHistory: [],
      hasMyHistoryLoaded: false,
      requestModalShow: false,
      requestModalInfo: {
        request: {
          _id: "",
          schemaVersion: "request.1",
          requestId: "",
          sender: "",
          foodStation: "Starbucks",
          orderNumber: "12312",
          created: "2020-08-24T07:33:18.879Z",
          status: "FoundVolunteer",
          deliverer: "",
          timeDelivererFound: "2020-09-12T22:17:04.503Z"
        },
        sender: {
            _id: "",
            schemaVersion: "user.1",
            userId: "",
            fullName: "Vlad Maksimovski",
            dormAndRoom: "Gale 334",
            email: "vmaksimo@u.rochester.edu",
            hashedPassword: "",
            hasAllergy: false,
            allergies: ""
        }
      }
    };

    this.getDeliveries = this.getDeliveries.bind(this);
    this.requestModalChange = this.requestModalChange.bind(this);
    this.requestChange = this.requestChange.bind(this);
  }

  requestModalChange(event) {
    if (typeof event === "boolean") {
      this.setState({
        requestModalShow: event,
      });
    } else if (typeof event.target.value === "string") {
      this.setState({
        requestModalShow: event.target.value === "true",
      });
    } else {
      throw new Error("Could not change request modal value.");
    }
  }

  requestChange(event) {
    const historyIndex = parseInt(event.target.value);
    this.setState({
      requestModalInfo: this.state.myHistory[historyIndex],
      requestModalShow: true
    });
  }

  componentDidMount() {
    this.getDeliveries();
  }

  async getDeliveries() {
    const { apiUrl } = this.props;

    fetch(`${apiUrl}/my-history`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if ("message" in data) {
          throw new Error(data.message);
        }

        this.setState({
          myHistory: data.history,
          hasMyHistoryLoaded: true,
        });
      })
      .catch((error) =>
        this.setState({
          error,
          myHistory: [],
          hasMyHistoryLoaded: true,
        })
      );
  }

  render() {
    const { error, myHistory, hasMyHistoryLoaded, requestModalShow, requestModalInfo } = this.state;
    const { userId } = this.props;
    const myHistoryList = myHistory.map((historyEntry, index) => (
      <li
        key={historyEntry.request.requestId}
        className={`d-flex justify-content-between align-items-center list-group-item ${
          index !== myHistory.length - 1 ? "mb-2" : ""
        }`}
      >
        <div>
          <b>{historyEntry.request.sender === userId ?
            "Order at " + historyEntry.request.foodStation :
            "Delivery for " + historyEntry.request.foodStation}</b>
          <br />
          <br />
          Last updated {historyEntry.request.status === "Requested" ?
            toLocalDelta(historyEntry.request.created) :
            toLocalDelta(historyEntry.request.timeDelivererFound)}
        </div>
        <div className="d-flex align-items-center">
          <button
            value={index}
            className="btn btn-primary"
            onClick={this.requestChange}
          >
            View
          </button>
        </div>
      </li>
    ));

    return (
      <div>
        <div
          id="load-my-history"
          style={hasMyHistoryLoaded ? { display: "none" } : {}}
        >
          <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="Loading..." />
        </div>
        <div
          id="error-my-history"
          className="alert alert-danger"
          style={error === null ? { display: "none" } : {}}
        >
          {error !== null && error.toString()}
        </div>

        <RequestModal
          requestModalShow={requestModalShow}
          requestModalChange={this.requestModalChange}
          requestModalInfo={requestModalInfo}
          />
        <ul className="list-group">
          {myHistoryList}
        </ul>
      </div>
    );
  }
}

export default MyHistoryPanel;
