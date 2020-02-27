import React from 'react';
import classes from './MonthPicker.module.css';

const monthPicker = (props) => (
    <div className={classes.Month}>
        <button className={classes.Button} onClick={props.clicked}>{props.children}</button>
    </div>
);

export default monthPicker;