import React from 'react';
import FoodStation from './FoodStation';

class FoodDeliveryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            dormAndRoom: '',
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

    render() {
        const { fullName, dormAndRoom, foodStation, orderNumber} = this.state;
        const fullNameChanged = this.fullNameChanged.bind(this);
        const dormAndRoomChanged = this.dormAndRoomChanged.bind(this);
        const foodStationChanged = this.foodStationChanged.bind(this);
        const orderNumberChanged = this.orderNumberChanged.bind(this);

        return (

            <form>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           onChange={fullNameChanged}
                           id="fullName"
                           name="fullName"
                           placeholder="Full Name"
                           value={fullName} />
                </div>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           onChange={dormAndRoomChanged}
                           id="dormAndRoom"
                           name="dormAndRoom"
                           placeholder="Dorm and Room"
                           value={dormAndRoom} />
                </div>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           onChange={dormAndRoomChanged}
                           id="dormAndRoom"
                           name="dormAndRoom"
                           placeholder="email@u.rochester.edu"
                           value={dormAndRoom} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <select className="form-control"
                                onChange={foodStationChanged}
                                id="foodStation"
                                name="foodStation"
                                value={foodStation}>
                            <option disabled value={FoodStation.None}> GrubHub Station </option>
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
                               value={orderNumber} />
                    </div>
                </div>

                <button type="submit"
                        id="submitButton"
                        className="btn btn-primary float-right">Send pick-up request</button>
            </form>
        );
    }
}

export default FoodDeliveryForm;
