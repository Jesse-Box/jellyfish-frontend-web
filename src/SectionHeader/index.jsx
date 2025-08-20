import React from 'react';
import { IconButton } from '../Button/index.jsx';
import { PlusIcon } from '@heroicons/react/24/outline';

function SectionHeader({ title, showButton = false, onButtonClick }) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-sm font-bold">{title}</h2>
			{showButton && (
				<IconButton
					variant="secondary"
					icon={PlusIcon}
					onClick={onButtonClick}
					aria-label="Add item"
				/>
			)}
		</div>
	);
}

export default SectionHeader;
