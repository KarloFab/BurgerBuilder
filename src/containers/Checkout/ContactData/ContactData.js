import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placholder: "Zip code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placholder: "Email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "input",
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastests'},
            {value: 'cheapest', displayValue: 'Cheapest'},
            ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <Input elementType="..." elementConfig="..." value="..."/>
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postalCode"
          placeholder="Postal code"
        />
        <Button btnType="success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.contactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
