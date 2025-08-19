import React from 'react';
import Button from '../Button';
import './style.css';

function SectionHeader({
	title,
	showButton = false,
	buttonText,
	onButtonClick,
}) {
	return (
		<div className="section-header">
			<h2>{title}</h2>
			{showButton && (
				<Button type="button" onClick={onButtonClick}>
					{buttonText}
				</Button>
			)}
		</div>
	);
}

export default SectionHeader;
