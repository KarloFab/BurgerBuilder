import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom'

const navigationItem = props => (
  <li className={styles.navigationItem}>
    <NavLink 
        to={props.link}
        exact
        activeClassName={styles.active}>{props.children}</NavLink>  
    </li>
);

export default navigationItem;