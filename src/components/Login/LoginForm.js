import React, { useState } from 'react';
import chart from '../../UI/Images/chart.png';
import classes from './LoginForm.module.css';

const LoginForm = (props) => {


    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');


    return (
        <form className={classes.Login} onSubmit={props.submitHandler}>
            <section className={classes.LoginForm}>
                <label className={[classes.Label1, classes.Label].join(' ')}>User Name</label>
                <input
                    className={[classes.input1, classes.Input].join(' ')}
                    type="email"
                    required
                    id="email"
                    value={enteredEmail}
                    onChange={
                        event => {
                            setEnteredEmail(event.target.value);
                        }} />
                <label className={[classes.Label2, classes.Label].join(' ')}>Password</label>
                <input
                    className={[classes.input2, classes.Input].join(' ')}
                    type="password"
                    required
                    minLength="6"
                    id="password"
                    value={enteredPassword}
                    onChange={
                        event => {
                            setEnteredPassword(event.target.value);
                        }} />
                <button className={classes.button} type='submit'>{props.button}</button>
            </section>
            <div className={classes.Logo}>
                <img src={chart} alt="MyImage" className={classes.LogoImage} />
                <h1 className={classes.LogoTitle}>Monthly Money Menegment</h1>
            </div>
        </form>
    );
}

export default LoginForm;