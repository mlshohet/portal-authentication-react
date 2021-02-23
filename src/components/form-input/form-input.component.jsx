import React from 'react';
import { MdAccountBox } from 'react-icons/md';
import { MdLock } from 'react-icons/md';

import './form-input.styles.css';

// Form input field, reused in all pages.
// Dynamically adds an icon, depending on the name passed to it.

const FormInput = ({handleChange, name, ...otherProps}) => {

	return (
		<div className="input-container">
			{
				name ?
					name === 'email' ? 
						<MdAccountBox size="30px" /> :
						<MdLock size="30px" />
				: ''
			}
			<input
				className="form-input"
				type="text"
				onChange={handleChange}
				{...otherProps}
			/>
		</div>	
	);
};

export default FormInput;