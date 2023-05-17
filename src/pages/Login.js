import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Alert from '../components/alert';
//custom hook import
import useContextGetter from '../hooks/contextGetter';
import useLoggedIn from '../hooks/useLoggedIn';
import '../styles/login.css';

function Login() {

    //page push to notes page if logged in
    useLoggedIn();

    const context = useContextGetter(); //context for dispatch
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const handleLogin = ({ email, password }) => {
        
        // create data to be sent to the api for validation
		let userData = {
			email: email,
			password: password,
        };
        //fetch data
        fetch(
			'https://user-manager-three.vercel.app/api/user/login',
			{
				method: 'POST',
                headers: { 'content-type': 'application/json' },
				body: JSON.stringify(userData) //stringify data which is an object
			}
        )
            .then(response => response.json())
            .then(result => {
                //if error found, send message
                if (result.error) {
                    setError(result.message)
                } else {
                    //login
                    context.dispatch({
					    type: 'LOGIN',
					    payload: result.body, //will contain data of user
				    });
                }
            })
            //if error
            .catch(err => {
				setError('Unable to complete request. Please try again after some time');
			});
    }

    return (
        <div className='login-form-section'>
            <form onSubmit={handleSubmit(handleLogin)} className='login-form'>
            <div className='login-heading'>
                <h1>Login</h1>
                <p>Login to view your notes</p>
                {error && <Alert error={error} />}
            </div>
            <div>
                <label htmlFor='email'>Email</label><br/>
                <input
                    type='email'
                    name='email'
                    id='email'
                    {...register('email', { required: true })}
                /><br/>
            </div>
            <div>
                <label htmlFor='password'>Password</label><br/>
                <input
                    type='password'
                    name='password'
                    id='password'
                    {...register('password', { required: true })}
                /><br/>
            </div>
            <div className='log-links'>
				<button type='submit' className='btn '>
					Login
                </button>
                <span>Don't have an account? <Link to='/register' className='reg'>Register</Link></span>
			</div>
        </form>
        </div>
    )
}

export default Login;