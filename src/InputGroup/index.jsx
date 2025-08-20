import React from 'react';
import Input from '../Input/index.jsx';
import { IconButton } from '../Button/index.jsx';
import {
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

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
		<div className="flex gap-2">
			<div className="flex flex-1 items-center gap-2">
				<Input
					id={id}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
				{hasError && (
					<div className="h-10 w-10 flex items-center justify-center">
						<ExclamationTriangleIcon
							className="w-5 h-5 text-red-500 flex-shrink-0"
							strokeWidth={1.5}
						/>
					</div>
				)}

				{showRemoveButton && (
					<IconButton
						variant="secondary"
						icon={XMarkIcon}
						onClick={onRemove}
						aria-label="Remove item"
					/>
				)}
			</div>
		</div>
	);
}

export default InputGroup;
