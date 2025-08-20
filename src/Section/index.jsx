import React from 'react';
import SectionHeader from './header.jsx';
import SectionBody from './body.jsx';

function Section({
	title,
	showButton = false,
	onButtonClick,
	validationError,
	children,
}) {
	return (
		<section className="flex flex-col gap-2">
			<SectionHeader
				title={title}
				showButton={showButton}
				onButtonClick={onButtonClick}
			/>
			<SectionBody validationError={validationError}>
				{children}
			</SectionBody>
		</section>
	);
}

export default Section;
