import React from 'react';
import clsx from 'clsx';
import { inputVariants } from './variants.jsx';

const Input = React.forwardRef(
	(
		{
			className,
			variant,
			size,
			type = 'text',
			disabled,
			id,
			value,
			onChange,
			placeholder,
			...props
		},
		ref
	) => {
		return (
			<input
				type={type}
				disabled={disabled}
				className={clsx(
					inputVariants({
						variant,
						size,
					}),
					className
				)}
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';

export default Input;
