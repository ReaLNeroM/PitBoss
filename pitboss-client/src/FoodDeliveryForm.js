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
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text"
                               className="form-control"
                               onChange={fullNameChanged}
                               id="fullName"
                               name="fullName"
                               placeholder="Name Surname"
                               value={fullName} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="dormAndRoom">Dorm + Room #</label>
                        <input type="text"
                               className="form-control"
                               onChange={dormAndRoomChanged}
                               id="dormAndRoom"
                               name="dormAndRoom"
                               placeholder="Anderson 101"
                               value={dormAndRoom} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="foodStation">GrubHub Station</label>
                        <select className="form-control"
                                onChange={foodStationChanged}
                                id="foodStation"
                                name="foodStation"
                                value={foodStation}>
                            <option disabled value={FoodStation.None}> -- select an option -- </option>
                            <option value={FoodStation.Pit}>Pit</option>
                            <option value={FoodStation.Starbucks}>Starbucks</option>
                            <option value={FoodStation.GrabNGo}>Grab N' Go</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="orderNumber">Order Number(s)</label>
                        <input type="text"
                               className="form-control"
                               onChange={orderNumberChanged}
                               id="orderNumber"
                               name="orderNumber"
                               placeholder="#22, #23"
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
