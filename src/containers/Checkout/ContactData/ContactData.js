import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your name"
            },
            value: "",
            validation: {
                required: true,
                minLength: 2,
                maxLength: 10
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street"
            },
            value: "",
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zip code",
                minLength: 5,
                maxLength: 5
            },
            value: "",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country"
            },
            value: "",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 10
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Email"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastests" },
                    { value: "cheapest", displayValue: "Cheapest" }
                ],
                value: "fastest",
                validation: {},
                valid: true
            }
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = event => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: this.state.totalPrice,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };

        const updatedFormInnerElement = {...updatedOrderForm[inputIdentifier] };

        updatedFormInnerElement.value = event.target.value;
        updatedFormInnerElement.valid = checkValidity(
            updatedFormInnerElement.value,
            updatedFormInnerElement.validation
        );
        updatedFormInnerElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormInnerElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);

        const fomrElementsArray = [];
        for (let key in orderForm) {
            fomrElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        let form = ( <
            form onSubmit = { orderHandler } > { " " } {
                fomrElementsArray.map(formElement => ( <
                    Input key = { formElement.id }
                    elementType = { formElement.config.elementType }
                    elementConfig = { formElement.config.elementConfig }
                    value = { formElement.config.value }
                    invalid = {!formElement.config.valid }
                    shouldValidate = { formElement.config.validation }
                    touched = { formElement.config.touched }
                    changed = { event => inputChangedHandler(event, formElement.id) }
                    />
                ))
            } { " " } <
            Button btnType = "success"
            clicked = { orderHandler }
            disabled = { formIsValid } >
            ORDER { " " } <
            /Button>{" "} <
            /form>
        );

        return ( <
            div className = { styles.contactData } >
            <
            h4 > Enter your Contact Data < /h4> {form}{" "} <
            /div>
        );
    };
};
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(contactData);