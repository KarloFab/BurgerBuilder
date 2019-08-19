import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-order";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    adress: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customerData: {
        name: "John Doe",
        address: {
          street: "TestStreet",
          zipCode: "12312",
          country: "Germany"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {

    let form = (
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal code" />
          <Button btnType="success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
    );

    if(this.state.loading){
        form = <Spinner />
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
