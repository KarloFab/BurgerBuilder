import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className = {styles.checkoutSummary}>
            <h1>Hope it tastes well!</h1>
            <div style = {{ width: '100%', height: '300px', margin:'auto'}}> 
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="danger" clicked>CANCEL</Button>
            <Button btnType="success" clicked>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;