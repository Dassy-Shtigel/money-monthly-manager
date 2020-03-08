import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = (props) => (
   props.show ? <div className={classes.backDrop}
      onClick={props.closed}></div> : null
);

export default backDrop;