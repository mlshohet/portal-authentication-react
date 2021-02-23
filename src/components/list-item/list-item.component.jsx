import React from 'react';
import './list-item.styles.css';

const ListItem = ({ children, ...otherProps }) => {
	return (
		<div
			className="list-item"
			{ ...otherProps }
		>
			{ children }
		</div>
	);
};

export default ListItem;