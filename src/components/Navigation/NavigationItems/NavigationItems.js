import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={styles.navigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/orders" active>Orders</NavigationItem>
    </ul>
);

export default navigationItems;