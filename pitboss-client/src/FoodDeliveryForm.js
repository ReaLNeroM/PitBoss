import React from 'react';
import FoodStation from './FoodStation';
import { withRouter } from 'react-router-dom';

function validateRequest(request){
    if(request.schemaVersion.trim() === ''){
        return "Schema version is empty";
    }

    return "";
}

class FoodDeliveryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            foodStation: FoodStation.None,
        };
    }

    foodStationChanged(event) {
        this.setState({
            foodStation: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { apiUrl, userId, isLoggedIn, sendInfoNotification } = this.props;
        const formData = new FormData(event.target);

        const schemaVersion = "request.1";
        const foodStation = this.state.foodStation; // hack because select's default
                                                    // value doesn't always work.
        const orderNumber = formData.get("orderNumber");

        const request = {
            schemaVersion,
            userId,
            foodStation,
            orderNumber
        };
        const validationError =
            (isLoggedIn !== true) ? "You must be logged in" : validateRequest(request);

        if(validationError === ''){
            fetch(`${apiUrl}/create-request`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(request),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    sendInfoNotification('Request submitted!');
                    this.props.history.push('/all-requests')
                });
        } else {
            this.setState({
               error: `Error: ${validationError}.`
            });
        }
    }

    render() {
        const { foodStation, error } = this.state;
        const foodStationChanged = this.foodStationChanged.bind(this);
        const handleSubmit = this.handleSubmit.bind(this)

        return (
            <form onSubmit={handleSubmit}>
                {error !== null &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <select className="form-control"
                                onChange={foodStationChanged}
                                id="foodStation"
                                name="foodStation"
                                value={foodStation}
                                required >
                            <option disabled value={FoodStation.None}> -- Select GrubHub Station -- </option>
                            <option value={FoodStation.Pit}>Pit</option>
                            <option value={FoodStation.Starbucks}>Starbucks</option>
                            <option value={FoodStation.GrabNGo}>Grab N' Go</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text"
                               className="form-control"
                               id="orderNumber"
                               name="orderNumber"
                               placeholder="Order Number(s)"
                               required />
                    </div>
                </div>

                <button type="submit"
                        id="submitButton"
                        className="btn btn-primary float-right">Send pick-up request</button>
            </form>
        );
    }
}

export default withRouter(FoodDeliveryForm);
