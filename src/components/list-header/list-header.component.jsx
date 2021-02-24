import React, { useState } from 'react';
import Login from '../../pages/login/login.component';
import './list-header.styles.css';

const ListHeader = props => {

	const [route, setRoute] = useState('list');


		return (
			route === 'list' ?
				(<div className="list-header">
					<span className="header-tagline">Don't Forget to Do Things!!</span>
					<div 
						className="list-sign-out"
						onClick={() => setRoute('login')}

					>Sign Out</div>
				</div>) :
			<Login />
		);
};

export default ListHeader;
