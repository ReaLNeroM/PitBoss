import React from "react";
import Modal from "react-bootstrap/Modal";
import TimeAgo from "react-timeago";

function toLocalDelta(timestamp) {
  const time = new Date(Date.parse(timestamp));
  return <TimeAgo date={time} />;
}

class RequestModal extends React.Component {
  render() {
    const { requestModalShow, requestModalChange, requestModalInfo } = this.props;
    const handleHide = () => requestModalChange(false);

    return (
      <Modal show={requestModalShow} onHide={handleHide} centered>
        <Modal.Header>
          <h5 className="modal-title" id="requestModalLabel">
            Order
          </h5>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            <li className="list-group-item">Food Station: {requestModalInfo.request.foodStation}</li>
            <li className="list-group-item">Order Number: {requestModalInfo.request.orderNumber}</li>
            <li className="list-group-item">Request created: {toLocalDelta(requestModalInfo.request.created)}</li>
            {requestModalInfo.request.deliverer &&
              <li className="list-group-item">Deliverer found: {toLocalDelta(requestModalInfo.request.timeDelivererFound)}</li>}
            <li className="list-group-item">Sender name: {requestModalInfo.sender.fullName}</li>
            <li className="list-group-item">Sender dorm: {requestModalInfo.sender.dormAndRoom}</li>
            <li className="list-group-item">Sender email: {requestModalInfo.sender.email}</li>
            <li className="list-group-item">Sender allergies: {requestModalInfo.sender.hasAllergy ? requestModalInfo.sender.allergies : "None"}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={requestModalChange}
            type="button"
            className="btn btn-secondary"
            value={false}
          >
            Close
          </button>
          <button type="submit" id="updateButton" className="btn btn-primary" disabled>
            Delivered!
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RequestModal;
