import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import ButtonPrime from '../button-prime/button-prime.component';

import './login-form.styles.css';

const LoginForm = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const handleSubmit = event => {
		event.preventDefault();
		setEmail('');
		setPassword('');
	};

	const handleEmailChange = event => {
		const { email } = event.target;
		setEmail(email);
	};

	const handlePasswordChange = event => {
		const { password } = event.target;
		setPassword(password);
	}

	return (
		<div className="login-form">
				<form
					onSubmit={handleSubmit}
				>
					<div className='form-input-container'>
						<label className="label">Email</label>
						<FormInput
							className="form-input"
							name="email" 
							type="email"
							placeholder="user@rapptrlabs.com"
							value={email} 
							handleChange={handleEmailChange}
							required 
						/>
					</div>
					<div className='form-input-container'>
						<label className="label">Password</label>
						<FormInput
							className="form-input"
							name="password" 
							type="password"
							placeholder="Must be at least 4 characters"
							value={password}
							handleChange={handlePasswordChange}
							required
						/>
					</div>
					
				</form>
				<ButtonPrime
						type="submit"
						value="Login"
					>
						Login
					</ButtonPrime>
		</div>
	);
};

export default LoginForm;