import { cva } from 'class-variance-authority';

export const alertVariants = cva(
	// Base styles that apply to all alerts
	[
		'flex',
		'items-center',
		'gap-2',
		'px-3',
		'py-2',
		'rounded-md',
		'border',
		'text-sm',
	],
	{
		variants: {
			variant: {
				success: ['text-green-800', 'bg-green-50', 'border-green-300'],
				error: ['text-red-800', 'bg-red-50', 'border-red-300'],
				warning: [
					'text-yellow-800',
					'bg-yellow-50',
					'border-yellow-300',
				],
				info: ['text-blue-800', 'bg-blue-50', 'border-blue-3re00'],
			},
			size: {
				sm: ['h-8', 'px-2', 'py-1', 'text-xs'],
				md: ['h-10', 'px-3', 'py-2', 'text-sm'],
				lg: ['h-11', 'px-4', 'py-3', 'text-base'],
			},
		},
		compoundVariants: [
			// Enhanced styling for different combinations
			{
				variant: 'error',
				size: 'lg',
				class: 'font-semibold',
			},
			{
				variant: 'success',
				size: 'sm',
				class: 'font-normal',
			},
		],
		defaultVariants: {
			variant: 'error',
			size: 'md',
		},
	}
);

export const alertIconVariants = cva(
	// Base styles for alert icons
	['flex-shrink-0'],
	{
		variants: {
			variant: {
				success: ['text-green-600'],
				error: ['text-red-600'],
				warning: ['text-yellow-600'],
				info: ['text-blue-600'],
			},
			size: {
				sm: ['w-4', 'h-4'],
				md: ['w-5', 'h-5'],
				lg: ['w-6', 'h-6'],
			},
		},
		defaultVariants: {
			variant: 'error',
			size: 'md',
		},
	}
);
