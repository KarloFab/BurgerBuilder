import React, { Fragment } from 'react';
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
      className={styles.modal}>
      {props.children}
    </div>
  </Fragment>
);


export default modal;