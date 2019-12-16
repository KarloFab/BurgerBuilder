import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [styles.sideDrawer, styles.close];
    if(props.open){
        attachedClasses = [styles.sideDrawer, styles.open]
    }

    return (
      <Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
          </nav>
        </div>
      </Fragment>
    );
};

export default sideDrawer;