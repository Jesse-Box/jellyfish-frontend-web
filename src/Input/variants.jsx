import { cva } from 'class-variance-authority';

export const inputVariants = cva(
	// Base styles that apply to all inputs
	[
		'flex',
		'w-full',
		'border',
		'rounded-md',
		'px-3',
		'py-2',
		'text-sm',
		'transition-all',
		'duration-200',
		'file:border-0',
		'file:bg-transparent',
		'file:text-sm',
		'file:font-medium',
		'placeholder:text-gray-500',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				default: [
					'border-gray-300',
					'bg-white',
					'text-gray-900',
					'hover:border-gray-400',
					'focus:border-blue-500',
					'focus-visible:ring-blue-500',
					'flex-1',
				],
			},
			size: {
				sm: ['h-8', 'px-2', 'text-xs'],
				md: ['h-10', 'px-3', 'text-sm'],
				lg: ['h-11', 'px-4', 'text-base'],
			},
		},
		compoundVariants: [
			// Future compound variants can be added here
			// For example, if you add more variants later:
			// {
			//   variant: 'default',
			//   size: 'lg',
			//   class: 'font-medium'
			// }
		],
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	}
);
