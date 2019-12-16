import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={styles.navigationItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders" active>
      Orders
    </NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth" active>
        Authenticate
      </NavigationItem>
    ) : (
      <NavigationItem link="/logout" active>
        Logout
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
