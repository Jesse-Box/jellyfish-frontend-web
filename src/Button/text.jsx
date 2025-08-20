import React from 'react';
import clsx from 'clsx';
import { buttonVariants } from './variants.jsx';

const ButtonText = React.forwardRef(
	(
		{
			className,
			variant,
			size,
			fullWidth,
			withForeground,
			type = 'button',
			disabled,
			loading,
			leftIcon,
			rightIcon,
			children,
			onClick,
			...props
		},
		ref
	) => {
		const handleClick = e => {
			if (loading || disabled) {
				e.preventDefault();
				return;
			}
			onClick?.(e);
		};

		return (
			<button
				type={type}
				disabled={disabled || loading}
				className={clsx(
					buttonVariants({
						variant,
						size,
						fullWidth,
						withForeground,
					}),
					{
						'cursor-not-allowed': disabled,
						'cursor-wait': loading,
					},
					className
				)}
				onClick={handleClick}
				ref={ref}
				{...props}
			>
				{loading && (
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{leftIcon && !loading && (
					<span className="mr-2 flex-shrink-0">{leftIcon}</span>
				)}
				{children}
				{rightIcon && !loading && (
					<span className="ml-2 flex-shrink-0">{rightIcon}</span>
				)}
			</button>
		);
	}
);

ButtonText.displayName = 'ButtonText';

export default ButtonText;
