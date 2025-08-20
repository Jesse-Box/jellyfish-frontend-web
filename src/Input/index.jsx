import React from 'react';

function Input({ id, value, onChange, placeholder }) {
	return (
		<input
			id={id}
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
}

export default Input;
