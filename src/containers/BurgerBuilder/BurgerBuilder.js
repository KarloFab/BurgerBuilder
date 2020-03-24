import React, { useState, useEffect, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchasedState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchased();
        props.history.push({ pathname: "/checkout" });
    };

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? ( <
        p > Ingredients can 't be loaded</p>
    ) : ( <
        Spinner / >
    );

    if (props.ingredients) {
        burger = ( <
            Fragment >
            <
            Burger ingredients = { props.ingredients }
            /> <
            BuildControls ingredientAdded = { props.onIngredientAdded }
            ingredientRemoved = { props.onIngredientRemoved }
            disabledInfo = { disabledInfo }
            purchasable = { updatePurchasedState(props.ingredients) }
            ordered = { purchaseHandler }
            price = { props.totalPrice }
            /> <
            /Fragment>
        );
        orderSummary = ( <
            OrderSummary ingredients = { props.ingredients }
            purchaseCancelled = { purchaseCancelHandler }
            purchaseContinued = { purchaseContinueHandler }
            totalPrice = { props.totalPrice }
            />
        );
    }
    return ( <
        Fragment >
        <
        Modal show = { purchasing }
        modalClosed = { purchaseCancelHandler } >
        { orderSummary } <
        /Modal> { burger } <
        /Fragment>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName =>
            dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: ingredientName =>
            dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));