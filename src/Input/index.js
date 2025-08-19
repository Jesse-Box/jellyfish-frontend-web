import React from 'react';

function Input({ id, value, onChange, error, placeholder }) {
	return (
		<>
			<input
				id={id}
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{error && (
				<div style={{ color: 'red', marginTop: '5px' }}>{error}</div>
			)}
		</>
	);
}

export default Input;
