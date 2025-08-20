import React from 'react';
import SectionHeader from '../SectionHeader/index.jsx';
import SectionBody from '../SectionBody/index.jsx';
import './style.css';

function Section({
	title,
	showButton = false,
	buttonText,
	onButtonClick,
	validationError,
	children,
}) {
	return (
		<section className="section">
			<SectionHeader
				title={title}
				showButton={showButton}
				buttonText={buttonText}
				onButtonClick={onButtonClick}
			/>
			<SectionBody validationError={validationError}>
				{children}
			</SectionBody>
		</section>
	);
}

export default Section;
