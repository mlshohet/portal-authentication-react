import React from 'react';
import { MdAccountBox } from 'react-icons/md';
import { MdLock } from 'react-icons/md';

import './form-input.styles.css';

// Form input field, reused in all pages.
// Dynamically adds an icon, depending on the name passed to it.
// Takes the passed name of the email and password props and the 
// isValidated props and decides dynamically 
// which class of the input form to render.

const FormInput = ({ 
		onChange, 
		name, 
		isValidatedEmail, 
		isValidatedPassword, 
		listInput, 
		...otherProps 
	}) => {

	return (
		<div 
			className={`
				${ 
					listInput ? 'input-container' :
						!isValidatedEmail && name === "email" ? 'invalid' : 
							!isValidatedPassword && name === "password" ? 
								'invalid' : 'input-container'
				}
			`}
		>
			{
				name ?
					name === 'email' ? 
						<MdAccountBox 
	
							size="30px" /> :
						<MdLock 
		
							size="30px" />
				: ''
			}
			<input
				className="form-input"
				type="text"
				onChange={onChange}
				{...otherProps}
			/>
		</div>	
	);
};

export default FormInput;