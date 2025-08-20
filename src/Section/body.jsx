import React from 'react';
import Alert from '../Alert/index.jsx';

function SectionBody({ validationError, children }) {
	return (
		<div className="flex flex-col gap-2">
			{validationError && (
				<Alert variant="error">{validationError}</Alert>
			)}
			{children}
		</div>
	);
}

export default SectionBody;
