import React from 'react';
import FoodStation from './FoodStation';
import { withRouter } from 'react-router-dom';

function validateRequest(request){
    if(request.schemaVersion.trim() === ''){
        return "Schema version is empty";
    } else if(!request.fullName.trim().includes(' ')){
        return "Please enter full name";
    } else if(!request.email.includes("@u.rochester.edu")){
        return "Please enter valid e-mail (must contain @u.rochester.edu)";
    }

    return "";
}

class FoodDeliveryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            fullName: '',
            dormAndRoom: '',
            email: '',
            foodStation: FoodStation.None,
            orderNumber: ''
        };
    }

    fullNameChanged(event) {
        this.setState({
            fullName: event.target.value
        });
    }
    dormAndRoomChanged(event) {
        this.setState({
            dormAndRoom: event.target.value
        });
    }
    emailChanged(event) {
        this.setState({
            email: event.target.value
        });
    }
    foodStationChanged(event) {
        this.setState({
            foodStation: event.target.value
        })
    }
    orderNumberChanged(event) {
        this.setState({
            orderNumber: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const schemaVersion = "request.1";
        const fullName = formData.get("fullName");
        const dormAndRoom = formData.get("dormAndRoom");
        const email = formData.get("email");
        const foodStation = this.state.foodStation; // hack because select's default
                                                    // value doesn't always work.
        const orderNumber = formData.get("orderNumber");

        const request = {
            schemaVersion,
            fullName,
            dormAndRoom,
            email,
            foodStation,
            orderNumber
        };
        const validationError = validateRequest(request);

        if(validationError === ''){
            fetch(`${this.state.apiUrl}/create_request`, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(this.props.history.push('/all-requests'))
        } else {
            alert(`Error: ${validationError}.`);
        }
    }

    render() {
        const { fullName, dormAndRoom, email, foodStation, orderNumber} = this.state;
        const fullNameChanged = this.fullNameChanged.bind(this);
        const dormAndRoomChanged = this.dormAndRoomChanged.bind(this);
        const emailChanged = this.emailChanged.bind(this);
        const foodStationChanged = this.foodStationChanged.bind(this);
        const orderNumberChanged = this.orderNumberChanged.bind(this);
        const handleSubmit = this.handleSubmit.bind(this)

        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           onChange={fullNameChanged}
                           id="fullName"
                           name="fullName"
                           placeholder="Full Name"
                           value={fullName}
                           required />
                </div>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           onChange={dormAndRoomChanged}
                           id="dormAndRoom"
                           name="dormAndRoom"
                           placeholder="Dorm and Room"
                           value={dormAndRoom}
                           required />
                </div>
                <div className="form-group">
                    <input type="email"
                           className="form-control"
                           onChange={emailChanged}
                           id="email"
                           name="email"
                           placeholder="email@u.rochester.edu"
                           value={email}
                           required />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <select className="form-control"
                                onChange={foodStationChanged}
                                id="foodStation"
                                name="foodStation"
                                value={foodStation}
                                required >
                            <option disabled value={FoodStation.None}> -- Please select GrubHub Station -- </option>
                            <option value={FoodStation.Pit}>Pit</option>
                            <option value={FoodStation.Starbucks}>Starbucks</option>
                            <option value={FoodStation.GrabNGo}>Grab N' Go</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text"
                               className="form-control"
                               onChange={orderNumberChanged}
                               id="orderNumber"
                               name="orderNumber"
                               placeholder="Order Number(s)"
                               value={orderNumber}
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
