import React, {Fragment} from 'react'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Fragment>
    <Toolbar></Toolbar>
    <main className={styles.content}>{props.children}</main>
  </Fragment>
);

export default layout;