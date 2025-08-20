import React from 'react';
import clsx from 'clsx';
import { buttonIconVariants, iconSizeVariants } from './variants.jsx';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const ButtonIcon = React.forwardRef(
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
			icon: Icon,
			strokeWidth = 1.5,
			onClick,
			'aria-label': ariaLabel,
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

		// Ensure aria-label is provided for accessibility
		if (!ariaLabel && !props['aria-labelledby'] && !props.title) {
			console.warn(
				'ButtonIcon: Please provide an aria-label, aria-labelledby, or title prop for accessibility.'
			);
		}

		return (
			<button
				type={type}
				disabled={disabled || loading}
				className={clsx(
					buttonIconVariants({
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
				aria-label={ariaLabel}
				ref={ref}
				{...props}
			>
				{loading ? (
					<ArrowPathIcon
						className={clsx(
							iconSizeVariants({ size }),
							'animate-spin'
						)}
						strokeWidth={strokeWidth}
					/>
				) : Icon ? (
					<Icon
						className={iconSizeVariants({ size })}
						strokeWidth={strokeWidth}
					/>
				) : null}
			</button>
		);
	}
);

ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
