import React, { Fragmentt } from "react";
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
        return ( <
            li key = { igKey } >
            <
            span style = {
                { textTransform: "capitalize" } } > { igKey } < /span>:{" "} { this.props.ingredients[igKey] } <
            /li>
        );
    });

    return ( <
        Fragment >
        <
        h3 > Order summary < /h3> <
        p > A delicious burger with the following ingredients < /p> <
        ul > { ingredientsSummary } < /ul> <
        p >
        Total price: < strong > { Number.parseFloat(this.props.totalPrice).toFixed(2) } < /strong> <
        /p> <
        p > Continue to checkout < /p> <
        Button btnType = "danger"
        clicked = { this.props.purchaseCancelled } >
        CANCEL <
        /Button> <
        Button btnType = "success"
        clicked = { this.props.purchaseContinued } >
        CONTINUE <
        /Button> <
        /Fragment>
    );
};

export default orderSummary;