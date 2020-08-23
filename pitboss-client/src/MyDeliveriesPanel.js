import React from "react";
import "./MyDeliveriesPanel.css";

class MyDeliveriesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      apiUrl: props.apiUrl,
      myDeliveries: [],
      haveMyDeliveriesLoaded: false,
    };

    this.getDeliveries = this.getDeliveries.bind(this);
  }

  componentDidMount() {
    this.getDeliveries();
  }

  async getDeliveries() {
    fetch(`${this.state.apiUrl}/my-deliveries`)
      .then((response) => response.json())
      .then((data) => {
        if ("message" in data) {
          throw new Error(data.message);
        }

        this.setState({
          myDeliveries: data,
          haveMyDeliveriesLoaded: true,
        });
      })
      .catch((error) =>
        this.setState({ error, myDeliveries: [], haveMyDeliveriesLoaded: true })
      );
  }

  render() {
    const { error, myDeliveries, haveMyDeliveriesLoaded } = this.state;
    const myDeliveriesList = myDeliveries.map((delivery, index) => <div />);

    return (
      <div id="my-deliveries">
        <div
          id="load-my-deliveries"
          style={haveMyDeliveriesLoaded ? { display: "none" } : {}}
        >
          <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="Loading..." />
        </div>
        <div
          id="error-my-deliveries"
          className="alert alert-info"
          style={error === null ? { display: "none" } : {}}
        >
          This tab hasn't been implemented yet, please wait ;)
        </div>
        <ul
          id="deliveries-list"
          className="list-group"
          style={haveMyDeliveriesLoaded ? {} : { display: "none" }}
        >
          {myDeliveriesList}
        </ul>
      </div>
    );
  }
}

export default MyDeliveriesPanel;
