import React from 'react';
import FoodStation from './FoodStation';

const FoodDeliveryForm = (props) => {
    const {
        onFullNameChange, fullName,
        onDormAndRoomChange, dormAndRoom,
        onFoodStationChange, foodStation,
        onOrderNumberChange, orderNumber } = props;
    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text"
                           className="form-control"
                           onChange={onFullNameChange}
                           id="fullName"
                           name="fullName"
                           placeholder="Name Surname"
                           value={fullName} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="dormAndRoom">Dorm + Room #</label>
                    <input type="text"
                           className="form-control"
                           onChange={onDormAndRoomChange}
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
                            onChange={onFoodStationChange}
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
                           onChange={onOrderNumberChange}
                           id="orderNumber"
                           name="orderNumber"
                           placeholder="#22, #23"
                           value={orderNumber} />
                </div>
            </div>

            <button type="submit"
                    id="submitButton"
                    className="btn btn-primary">Send pick-up request</button>
        </form>
    );
}

export default FoodDeliveryForm;
