import React from 'react';
import LoginForm from '../../components/login-form/login-form.component';

import './login.styles.css';

const Login = props => {
	return (
		<div className="login">
			<h1 className="title">RAPPTR LABS</h1>
			<span className="tagline">Sign in with Email and Password</span>
			<LoginForm />
		</div>

	);
};

export default Login;