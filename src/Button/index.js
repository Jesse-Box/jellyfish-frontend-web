import React from 'react';

function Button({ type, disabled, onClick, children }) {
	return (
		<button type={type} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
