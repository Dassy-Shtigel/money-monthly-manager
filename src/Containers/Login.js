import React, { useState, useContext } from 'react';
import LoginForm from '../components/Login/LoginForm';
import { AuthContext } from '../contex/auth-contex';
import { Route } from 'react-router-dom';
import MonthManagerBuilder from '../Containers/MonthManagerBuilder'

const Login = (props) => {
    const authContext = useContext(AuthContext);

    const LoginHandler = () => {
        authContext.login();
    }

    return (
        <div>
            <LoginForm submitHandler={LoginHandler}/>
        </div>
    );
}

export default Login;
