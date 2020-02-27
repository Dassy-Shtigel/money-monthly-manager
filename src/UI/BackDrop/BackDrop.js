import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = (props) => (
   props.show ? <div className={classes.BackDrop}
      onClick={props.closed}></div> : null
);

export default backDrop;