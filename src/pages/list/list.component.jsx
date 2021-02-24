import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import ListItem from '../../components/list-item/list-item.component';
import ButtonPrime from '../../components/button-prime/button-prime.component';
import Login from '../../pages/login/login.component';

import './list.styles.css';

const ToDoList = props => {
	
	// State is set with value from the input field, obtained from
	// the onChange event listener.
	// Then the text is added to an array of list items.
	// List item state is reset after it is added to array
	// and input field is cleared.
	// Some input validation is peformed as well.

	// Routing also controlled with useState.

	const [listItem, setListItem] = useState('');
	const [listItems, setListItems] = useState([]);
	const [route, setRoute] = useState('list');

	const handleInput = event => {
		event.preventDefault();
		setListItem(event.target.value);
	};

	const handleSave = event => {
		event.preventDefault();
		if (listItem) {
			setListItems([ ...listItems, listItem ]);
			setListItem('');
			document.getElementById('input').value = '';
		} else {
			return null;
		}
	};

	// When deleting a memo, new array is returned and used to set new state
	// Event listener is passed to the List Item component, below in render.

	const handleDelete = item => {
		if (item) {
			const newItems = listItems.filter(entry =>
				entry !== item
			);
			setListItems(newItems);
		}
	};

	// The list of items in state is iterated and visualized
	// with the ListItem component

	return (
		route === 'list' ?
		<div className="list">
			<div className="list-header">
				<span className="header-tagline">Don't Forget to Do Things!!!</span>
					<div 
						className="list-sign-out"
						onClick={() => setRoute('login')}
					>		SIGN OUT
					</div>
			</div> 
			<form className="list-input-container">
				<FormInput 
					id="input"
					listInput
					onChange={handleInput}
				/>
				<ButtonPrime 
					list
					onClick={handleSave}
				>
					Save
				</ButtonPrime>
			</form>
			<div className="list-container">
				{
					listItems.map(item => (
						<ListItem
							key={item}
							onClick={() => {handleDelete(item)}}
						>
							{item}
						</ListItem>
					))
				}
			</div>
		</div>
		:
		<Login />
	);
};

export default ToDoList;