import React from "react";
import "./MyHistoryPanel.css";

class MyHistoryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      apiUrl: props.apiUrl,
      myDeliveries: [],
      myRequests: [],
      hasMyHistoryLoaded: false,
    };

    this.getDeliveries = this.getDeliveries.bind(this);
  }

  componentDidMount() {
    this.getDeliveries();
  }

  async getDeliveries() {
    fetch(`${this.state.apiUrl}/my-history`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if ("message" in data) {
          throw new Error(data.message);
        }

        this.setState({
          myRequests: data.myRequests,
          myDeliveries: data.myDeliveries,
          hasMyHistoryLoaded: true,
        });
      })
      .catch((error) =>
        this.setState({
          error,
          myRequests: [],
          myDeliveries: [],
          hasMyHistoryLoaded: true,
        })
      );
  }

  render() {
    const { error, myRequests, myDeliveries, hasMyHistoryLoaded } = this.state;
    const myDeliveriesList = myDeliveries.map((delivery, index) => (
      <div>
        {delivery.foodStation}
        <br />
        {delivery.orderNumber}
        <br />
        {delivery.status}
        <br />
        {delivery.created}
      </div>
    ));
    const myRequestsList = myRequests.map((delivery, index) => (
      <div>
        {delivery.foodStation}
        <br />
        {delivery.orderNumber}
        <br />
        {delivery.status}
        <br />
        {delivery.created}
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
          id="deliveries-list"
          className="list-group"
          style={hasMyHistoryLoaded ? {} : { display: "none" }}
        >
          {myDeliveriesList}
        </ul>
        <ul
          id="requests-list"
          className="list-group"
          style={hasMyHistoryLoaded ? {} : { display: "none" }}
        >
          {myRequestsList}
        </ul>
      </div>
    );
  }
}

export default MyHistoryPanel;
