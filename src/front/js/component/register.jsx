import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const { store, actions } = useContext(Context);

    const [registerFormData, setRegisterFormData] = useState({ email: '', password: '' });
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    const handleRegisterChange = e => setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    const handleLoginChange = e => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });

    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (actions.register(registerFormData)) navigate('/private');
    };

    const handleLoginSubmit = e => {
        e.preventDefault();
        if (actions.login(loginFormData)) navigate('/private');
    };

    return (
        <>
            <form onSubmit={handleRegisterSubmit} className='form-control'>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleRegisterChange}
                    name='email'
                    value={registerFormData.email}
                    placeholder='email'
                />
                <input
                    type='password'
                    className='form-control'
                    onChange={handleRegisterChange}
                    name='password'
                    value={registerFormData.password}
                    placeholder='password'
                />
                <input type='submit' value="register" disabled={localStorage.getItem('token') ? true : false} />
            </form>

            <form onSubmit={handleLoginSubmit} className='form-control'>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleLoginChange}
                    name='email'
                    value={loginFormData.email}
                    placeholder='email'
                />
                <input
                    type='password'
                    className='form-control'
                    onChange={handleLoginChange}
                    name='password'
                    value={loginFormData.password}
                    placeholder='password'
                />
                <input type='submit' value="Login"/>
            </form>
            {localStorage.getItem('token')&&<Link to={'/private'}>Area Privada</Link>}
        </>
    );
};