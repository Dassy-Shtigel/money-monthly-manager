import React, { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';

const Login = (props) => {

    const [buttonText, setButtonText] = useState('Login');

    const LoginHandler = () => {
        setButtonText('Authonticated');
    }

    return (
        <div>
            <LoginForm submitHandler={LoginHandler} button={buttonText} />
        </div>
    );
}

export default Login;
