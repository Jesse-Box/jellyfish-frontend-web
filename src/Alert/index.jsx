import React from 'react';
import clsx from 'clsx';
import { alertVariants, alertIconVariants } from './variants.jsx';
import {
	CheckCircleIcon,
	XCircleIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/outline';

const Alert = React.forwardRef(
	(
		{
			className,
			variant = 'error',
			size,
			showIcon = true,
			icon,
			children,
			...props
		},
		ref
	) => {
		const getDefaultIcon = () => {
			const icons = {
				success: CheckCircleIcon,
				error: ExclamationTriangleIcon,
				warning: ExclamationTriangleIcon,
				info: InformationCircleIcon,
			};
			return icons[variant] || icons.error;
		};

		const IconComponent = icon || getDefaultIcon();

		return (
			<div
				className={clsx(
					alertVariants({
						variant,
						size,
					}),
					className
				)}
				ref={ref}
				{...props}
			>
				{showIcon && (
					<IconComponent
						className={clsx(
							alertIconVariants({
								variant,
								size,
							})
						)}
						strokeWidth={1.5}
					/>
				)}
				<div className="flex-1">{children}</div>
			</div>
		);
	}
);

Alert.displayName = 'Alert';

export default Alert;
