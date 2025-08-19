import React from 'react';
import Input from '../Input';
import './style.css';

function InputGroup({ id, label, value, onChange, error, placeholder }) {
	return (
		<div className="input-group">
			<label htmlFor={id}>{label}:</label>
			<Input
				id={id}
				value={value}
				onChange={onChange}
				error={error}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default InputGroup;
