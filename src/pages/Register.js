import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Alert from '../components/alert';
//custom hooks import
import useContextGetter from '../hooks/contextGetter';
import useLoggedIn from '../hooks/useLoggedIn';
import '../styles/regsiter.css';

function Register() {

    //page push to notes page if isUserLoggedIn is true
	useLoggedIn();

    const { register, handleSubmit } = useForm(); //useForm syntax
    const context = useContextGetter(); //useContext
    const [error, setError] = useState(''); //set error message

    const handleRegister = ({ email, password, confirmPassword }) => {
        //check if password and confirmPassword match
        if (password !== confirmPassword) {
            setError(`Passwords don't match!`);
        }

        //api register new user
        //new user data object
        let newUser = {
            email: email,
            password: password
        }

        fetch(
            `https://user-manager-three.vercel.app/api/user/register`,
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser), //always stringify objects             
            }
        )
            .then(response => response.json()) //close buffer and convert to json
            .then(result => {
                //if there is a request error return message
                if (result.error) {
                    setError(result.message)
                } else {
                    //else set user to logged in
                    context.dispatch({
                        type: 'LOGIN',
                        payload: result.body
                    });
                }
            })
                //catch an error if there's another issue
            .catch(err => {
                setError('An error occurred. Please try again later.');
            })
    }
    
    return (
        <div className='reg-form-section'>
            <form onSubmit={handleSubmit(handleRegister)} className='register-form' >
                <div className='reg-heading'>
                    <h1>Register</h1>
                    <p>Manage your notes efficiently</p>
                    {error && <Alert error={error} />}
                </div>
                <div>
                    <label htmlFor='email'>Email</label><br />
                    <input
                        type='email'
                        name='email'
                        id='email'
                        {...register('email', { required: true })}
                    /><br/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label><br />
                    <input
                        type='password'
                        name='password'
                        id='password'
                        {...register('password', { required: true })}
                    /><br/>
                </div>
                <div>
                    <label htmlFor='confirm-password'>Confirm Password</label><br/>
                    <input
                        type='password'
                        name='confirm-password'
                        id='confirm-password'
                        {...register('confirmPassword', { required: true })}
                    /><br/>
                </div>
                <div className='reg-links'>
                    <button type='submit' className='btn'>
                        Register
                    </button>
                    <span>Already have an account? <Link to='/login' className='log'>Login</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Register;