import React from 'react';
import './MyDeliveriesPanel.css';

const MyDeliveriesPanel = (props) => {
    const { haveMyDeliveriesLoaded } = props;
    return (
        <div id="my-deliveries">
            <div id="load-my-deliveries"
                 style={haveMyDeliveriesLoaded ? {display: 'none'} : {}}>
                <img src="/loading.gif" alt="" />
            </div>
            <ul id="deliveries-list"
                className="list-group"
                style={haveMyDeliveriesLoaded ? {} : {display: 'none'}}>
                hello
            </ul>
        </div>
    );
}

export default MyDeliveriesPanel;
