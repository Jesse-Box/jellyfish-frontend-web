import React from 'react';
import './style.css';

function Alert({ variant = 'error', children }) {
	const getIcon = () => {
		return variant === 'success' ? '✅' : '⚠';
	};

	return (
		<div className={`alert alert-${variant}`}>
			<span className="alert-icon">{getIcon()}</span>
			<div>{children}</div>
		</div>
	);
}

export default Alert;
