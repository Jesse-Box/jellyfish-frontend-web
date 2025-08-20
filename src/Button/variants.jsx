import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	// Base styles that apply to all buttons
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'rounded-md',
		'font-semibold',
		'transition-all',
		'duration-200',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-offset-2',
		'disabled:pointer-events-none',
		'disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				primary: [
					'bg-blue-600',
					'text-white',
					'hover:bg-blue-700',
					'active:bg-blue-800',
					'focus-visible:ring-blue-600',
				],
				secondary: [
					'bg-gray-100',
					'text-gray-900',
					'hover:bg-gray-200',
					'active:bg-gray-300',
					'focus-visible:ring-gray-500',
				],
				destructive: [
					'bg-red-600',
					'text-white',
					'hover:bg-red-700',
					'active:bg-red-800',
					'focus-visible:ring-red-600',
				],
				outline: [
					'border',
					'border-gray-300',
					'bg-transparent',
					'text-gray-700',
					'hover:bg-gray-50',
					'hover:border-gray-400',
					'active:bg-gray-100',
					'focus-visible:ring-gray-500',
				],
				ghost: [
					'bg-transparent',
					'text-gray-700',
					'hover:bg-gray-100',
					'active:bg-gray-200',
					'focus-visible:ring-gray-500',
				],
				link: [
					'bg-transparent',
					'text-blue-600',
					'underline-offset-4',
					'hover:underline',
					'focus-visible:ring-blue-600',
					'px-0',
				],
			},
			size: {
				xs: ['h-7', 'px-2', 'text-xs'],
				sm: ['h-8', 'px-3', 'text-sm'],
				md: ['h-10', 'px-4', 'text-sm'],
				lg: ['h-11', 'px-6', 'text-base'],
				xl: ['h-12', 'px-8', 'text-base'],
				icon: ['h-10', 'w-10', 'p-0'],
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-auto',
			},
			withForeground: {
				true: 'relative',
				false: '',
			},
		},
		compoundVariants: [
			// Special combinations for enhanced styling
			{
				variant: 'destructive',
				size: 'sm',
				class: 'font-semibold',
			},
			{
				variant: 'outline',
				size: 'icon',
				class: 'border-2',
			},
			{
				variant: 'link',
				size: ['xs', 'sm'],
				class: 'h-auto py-1',
			},
			{
				variant: 'ghost',
				size: 'icon',
				class: 'hover:bg-gray-200',
			},
		],
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			fullWidth: false,
			withForeground: false,
		},
	}
);

export const buttonIconVariants = cva(
	// Base styles that apply to all icon buttons (similar to button base)
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'rounded-md',
		'font-medium',
		'transition-all',
		'duration-200',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-offset-2',
		'disabled:pointer-events-none',
		'disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				primary: [
					'bg-blue-600',
					'text-white',
					'hover:bg-blue-700',
					'active:bg-blue-800',
					'focus-visible:ring-blue-600',
				],
				secondary: [
					'bg-gray-100',
					'text-gray-900',
					'hover:bg-gray-200',
					'active:bg-gray-300',
					'focus-visible:ring-gray-500',
				],
				destructive: [
					'bg-red-600',
					'text-white',
					'hover:bg-red-700',
					'active:bg-red-800',
					'focus-visible:ring-red-600',
				],
				outline: [
					'border',
					'border-gray-300',
					'bg-transparent',
					'text-gray-700',
					'hover:bg-gray-50',
					'hover:border-gray-400',
					'active:bg-gray-100',
					'focus-visible:ring-gray-500',
				],
				ghost: [
					'bg-transparent',
					'text-gray-700',
					'hover:bg-gray-100',
					'active:bg-gray-200',
					'focus-visible:ring-gray-500',
				],
				link: [
					'bg-transparent',
					'text-blue-600',
					'hover:underline',
					'focus-visible:ring-blue-600',
				],
			},
			size: {
				xs: ['h-6', 'w-6', 'p-1'],
				sm: ['h-8', 'w-8', 'p-2'],
				md: ['h-10', 'w-10', 'p-2.5'],
				lg: ['h-11', 'w-11', 'p-3'],
				xl: ['h-12', 'w-12', 'p-3.5'],
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-auto',
			},
			withForeground: {
				true: 'relative',
				false: '',
			},
		},
		compoundVariants: [
			// Icon-specific combinations
			{
				variant: 'destructive',
				size: 'sm',
				class: 'font-semibold',
			},
			{
				variant: 'outline',
				size: ['lg', 'xl'],
				class: 'border-2',
			},
			{
				variant: 'ghost',
				size: ['sm', 'xs'],
				class: 'hover:bg-gray-200',
			},
			// Full width icon buttons get special treatment
			{
				fullWidth: true,
				class: 'h-auto aspect-square',
			},
		],
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			fullWidth: false,
			withForeground: false,
		},
	}
);

export const iconSizeVariants = cva(
	// Base icon styles
	[],
	{
		variants: {
			size: {
				xs: ['w-3', 'h-3'], // 12px
				sm: ['w-4', 'h-4'], // 16px
				md: ['w-5', 'h-5'], // 20px
				lg: ['w-6', 'h-6'], // 24px
				xl: ['w-7', 'h-7'], // 28px
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}
);
