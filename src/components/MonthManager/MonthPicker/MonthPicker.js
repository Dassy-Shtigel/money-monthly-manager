import React from 'react';
import classes from './MonthPicker.module.css';

const monthPicker = (props) => (
    <div className={classes.month}>
        <button className={classes.button} onClick={props.clicked}>{props.children}</button>
    </div>
);

export default monthPicker;