import React from 'react';
import './button-prime.styles.css';

const ButtonPrime = ({ children, list, ...otherProps}) => {
	return (
		<button
			className={`
				button-prime
				${ list ? 'list-button' : '' }
			`}
			{ ...otherProps }
			>
			{ children }
		</button>
	);
}

export default ButtonPrime;