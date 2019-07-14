import React, { Fragment } from "react";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
          <li key = {igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>
            : {props.ingredients[igKey]}
          </li>
        );
    });
  return (
    <Fragment>
      <h3 />
      <p>A delicious burger with the following ingredients</p>
      <ul>
          {ingredientsSummary}
      </ul>
      <p>Total price: <strong>{props.totalPrice}</strong></p>
      <p>Continue to checkout</p>
      <Button btnType = "danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType = "success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Fragment>
  );
};

export default orderSummary;
