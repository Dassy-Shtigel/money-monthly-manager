import React, { useState } from 'react';
import chart from '../../UI/Images/chart.png';
import classes from './LoginForm.module.css';

const LoginForm = (props) => {


    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');


    return (
        <form className={classes.login} onSubmit={props.submitHandler}>
            <section className={classes.loginForm}>
                <label className={[classes.label1, classes.label].join(' ')}>User Name</label>
                <input
                    className={[classes.input1, classes.input].join(' ')}
                    type="email"
                    required
                    id="email"
                    value={enteredEmail}
                    onChange={
                        event => {
                            setEnteredEmail(event.target.value);
                        }} />
                <label className={[classes.label2, classes.label].join(' ')}>Password</label>
                <input
                    className={[classes.input2, classes.input].join(' ')}
                    type="password"
                    required
                    minLength="6"
                    id="password"
                    value={enteredPassword}
                    onChange={
                        event => {
                            setEnteredPassword(event.target.value);
                        }} />
                <button className={classes.button} type='submit'>Login</button>
            </section>
            <div className={classes.logo}>
                <img src={chart} alt="MyImage" className={classes.logoImage} />
                <h1 className={classes.logoTitle}>Monthly Money Menegment</h1>
            </div>
        </form>
    );
}

export default LoginForm;