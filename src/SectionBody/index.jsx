import React from 'react';
import Alert from '../Alert/index.jsx';
import './style.css';

function SectionBody({ validationError, children }) {
	return (
		<div className="section-body">
			{validationError && (
				<Alert variant="error">{validationError}</Alert>
			)}
			{children}
		</div>
	);
}

export default SectionBody;
