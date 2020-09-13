import React from "react";
import "./MyHistoryPanel.css";

class MyHistoryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      myHistory: [],
      hasMyHistoryLoaded: false,
    };

    this.getDeliveries = this.getDeliveries.bind(this);
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
    const { error, myHistory, hasMyHistoryLoaded } = this.state;
    const myHistoryList = myHistory.map((historyEntry, index) => (
      <div>
        {historyEntry.request.foodStation}
        <br />
        {historyEntry.request.orderNumber}
        <br />
        {historyEntry.request.status}
        <br />
        {historyEntry.request.created}
      </div>
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
          className="alert alert-info"
          style={error === null ? { display: "none" } : {}}
        >
          This tab hasn't been implemented yet, please wait ;)
        </div>
        <ul
          id="history-list"
          className="list-group"
          style={hasMyHistoryLoaded ? {} : { display: "none" }}
        >
          {myHistoryList}
        </ul>
      </div>
    );
  }
}

export default MyHistoryPanel;
