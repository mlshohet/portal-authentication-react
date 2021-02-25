import React from 'react';
import LoginForm from '../../components/login-form/login-form.component';

import './login.styles.css';

const Login = props => {

	return (
		<div className="login-page">
			<LoginForm />
		</div>
	);
};

export default Login;