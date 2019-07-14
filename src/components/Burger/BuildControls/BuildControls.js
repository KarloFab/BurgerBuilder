import React from 'react'
import styles from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Onion", type: "onion" },
    { label: "Tomato", type: "tomato" },
];

const buildControls = (props) => (
    <div className={styles.buildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabledInfo[ctrl.type]}/>
        ))}
        <button className={styles.orderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;