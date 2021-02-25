import React, { useState, useEffect } from 'react';
import FormInput from '../form-input/form-input.component';
import ToDoList from '../../pages/list/list.component'
import ButtonPrime from '../button-prime/button-prime.component';

import './login-form.styles.css';

const LoginForm = props => {

	// State of the login component.
	// The email and the password of the current user, current route
	// and control variables.

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [route, setRoute] = useState('signin');
	const [isValidatedEmail, setValidatedEmail] = useState(true);
	const [isValidatedPassword, setValidatedPassword] = useState(true);
	const [blurEmail, setBlurEmail] = useState(false);
	const [blurPassword, setBlurPassword] = useState(false);

	// useEffect hook is used to validate input.
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

	// Validation functions of email and password for the onBlur events.

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

	// This is the API call, appears to be blocked by CORS.
	// This function would be called back in the onClick event of the Login button below
	// to fetch the user.

	const submitSignIn = () => {
		fetch("https://dev.rapptrlabs.com/Tests/scripts/user-login.php", {
		    method: "POST",
		    headers: {
		      "Content-Type": "application/json"
		    },
		    body: JSON.stringify({
		      'email': email,
		      'password': password
		    })
		  })
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(err => console.log)
	};


	// Session persistance. Function runs on submit, stores the email and password 
	// in local storage.

	const handleSubmit = () => {
		if (isValidatedEmail && isValidatedPassword) {
			const sessionToStore = {
				email: email,
				password: password
			};
			window.localStorage.setItem('storedSession', JSON.stringify(sessionToStore));
		}
		setRoute('list');
	}

	// Retrieves the stored email and password and validates them 
	// before routing to the to-do list.

	useEffect(() => {
		const retrievedSession = window.localStorage.getItem('storedSession');
		if (retrievedSession) {
			const session = JSON.parse(retrievedSession);
			blurValidateEmail(session.email);
			blurValidatePassword(session.password);
			if (isValidatedEmail && isValidatedPassword) {
				setRoute('list');
			}
		} else {
			setRoute('signin');
		}
	}, []);

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
					onClick={handleSubmit}
					disabled={

						// Input validation for the Login button
						
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


