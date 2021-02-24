import React, { useState, useEffect } from 'react';
import FormInput from '../form-input/form-input.component';
import ToDoList from '../../pages/list/list.component'
import ButtonPrime from '../button-prime/button-prime.component';

import './login-form.styles.css';

const LoginForm = props => {

	// State of the login component.
	// The email and the password of the current user and the current route

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [route, setRoute] = useState('signin');
	const [isValidatedEmail, setValidatedEmail] = useState(true);
	const [isValidatedPassword, setValidatedPassword] = useState(true);
	const [blurEmail, setBlurEmail] = useState(false);
	const [blurPassword, setBlurPassword] = useState(false);

	// useEffect hook is used to validate input!
	// Regex key for email.

	useEffect(() => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if (!blurEmail || (regex.test(email) && email.length < 50)) {
  			setValidatedEmail(true);
  		} else {
  			setValidatedEmail(false);
  		}
	},[email, blurEmail]);

	useEffect(() => {
		if (!blurPassword || password.length > 3) {
			setValidatedPassword(true);
		} else {
			setValidatedPassword(false);
		}
	},[password.length, blurPassword]);

	// Validation functions for the onBlur event.

	const blurValidateEmail = (email) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if (regex.test(email) && email.length < 50) {
  			setValidatedEmail(true);
  		} else {
  			setValidatedEmail(false);
  		}
		setBlurEmail(true);
	};

	const blurValidatePassword = (password) => {
		if (password.length > 3 && password.length < 16) {
	 		setValidatedPassword(true);
	 	} else {
	 		setValidatedPassword(false);
	 	}
		setBlurPassword(true);
	};

	// If route is set to "signin" the present component is rendered.
	// If route changes from submitting the form, the To Do List is rendered.

	return (
		route === 'signin' ?
			<div className="login-container">
			<h1 className="login-title">RAPPTR LABS</h1>
			<span className="login-tagline">Sign in with Email and Password</span>
			<form className="login-form">
				<div className='form-input-container'>
					<label className="label">Email</label>
					<FormInput
						className="form-input"
						name="email" 
						type="email"
						placeholder="user@rapptrlabs.com"
						value={email}
						isValidatedEmail={isValidatedEmail}
						onBlur={() => blurValidateEmail(email)}
						onChange={event => setEmail(event.target.value)}
						required 
					/>
					{
						//A placeholder div is created with a zero width character to
						// be replaced by the error message

						!isValidatedEmail ?
						<div className="failed-valid">
							Please enter a valid email address.
						</div> :
						<span className="valid">&zwnj;</span>
					}
				</div>
				<div className='form-input-container'>
					<label className="label">Password</label>
					<FormInput
						name="password" 
						type="password"
						isValidatedPassword={isValidatedPassword}
						placeholder="Must be at least 4 characters"
						value={password}
						onBlur={() => blurValidatePassword(password)}
						onChange={ event => setPassword(event.target.value)}
						required
					/>
					{
						!isValidatedPassword ?
						<div className="failed-valid">
							Please enter a valid password.
						</div> :
						<span className="valid">&zwnj;</span>
					}
				</div>
				<ButtonPrime
					type="submit"
					value="Login"
					onClick={() => setRoute('to-do-list')}
					disabled={

						//Crucial validation here at the Submit level
						
						email === '' || password.length < 4 || 
						!isValidatedEmail || !isValidatedPassword
					}
				>
					Login
				</ButtonPrime>
			</form>
			</div>
		: 
		<ToDoList />
	);
};

export default LoginForm;