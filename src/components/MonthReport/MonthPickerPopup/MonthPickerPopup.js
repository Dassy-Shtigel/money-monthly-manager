import React from 'react';
import classes from './MonthPickerPopup.module.css';


const MonthPickerPopup = (props) => {


    const monthsList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return (
        <div >
            <section className={classes.Popup}>
                {monthsList.map((month, index) =>
                    <label className={classes.Label} onClick={
                        props.clicked} key={index} >{month}</label>
                )}
            </section>
        </div>
    );
}

export default MonthPickerPopup;

