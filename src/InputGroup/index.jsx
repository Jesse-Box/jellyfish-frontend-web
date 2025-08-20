import React from 'react';
import Input from '../Input/index.jsx';
import Button from '../Button/index.jsx';
import './style.css';

function InputGroup({
	id,
	value,
	onChange,
	hasError = false,
	placeholder,
	showRemoveButton = false,
	onRemove,
}) {
	return (
		<div className="input-group">
			<div className="input-row">
				<div className="input-with-icon">
					<Input
						id={id}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
					/>
					{hasError && <span className="warning-icon">⚠</span>}
				</div>
				{showRemoveButton && (
					<Button type="button" onClick={onRemove}>
						−
					</Button>
				)}
			</div>
		</div>
	);
}

export default InputGroup;
