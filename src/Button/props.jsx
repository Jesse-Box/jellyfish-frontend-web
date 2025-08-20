// Shared prop definitions for Button and IconButton components
// This ensures consistent prop handling across both components

export const ButtonProps = {
	// Variant options (shared between Button and IconButton)
	variants: [
		'primary',
		'secondary',
		'destructive',
		'outline',
		'ghost',
		'link',
	],

	// Size options (Button has more text-based sizes, IconButton has square sizes)
	buttonSizes: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
	buttonIconSizes: ['xs', 'sm', 'md', 'lg', 'xl'],

	// Boolean props shared between components
	booleanProps: ['fullWidth', 'withForeground', 'disabled', 'loading'],

	// Standard HTML button props that both components accept
	htmlProps: [
		'type',
		'onClick',
		'onFocus',
		'onBlur',
		'onKeyDown',
		'onMouseEnter',
		'onMouseLeave',
	],

	// Default values
	defaults: {
		variant: 'primary',
		size: 'md',
		type: 'button',
		fullWidth: false,
		withForeground: false,
		disabled: false,
		loading: false,
	},
};

// Icon-specific props for IconButton
export const buttonIconProps = {
	// Required props
	required: ['icon', 'aria-label'], // aria-label is required for accessibility

	// Icon-specific optional props
	optional: ['strokeWidth'],

	// Default values
	defaults: {
		strokeWidth: 1.5,
	},
};

// Button-specific props
export const buttonProps = {
	// Text button specific props
	optional: ['leftIcon', 'rightIcon', 'children'],
};

// Prop validation helpers
export const validateSharedProps = (componentName, props) => {
	const { variant, size } = props;

	if (variant && !ButtonProps.variants.includes(variant)) {
		console.warn(
			`${componentName}: Invalid variant "${variant}". Expected one of: ${ButtonProps.variants.join(', ')}`
		);
	}

	if (
		componentName === 'IconButton' &&
		size &&
		!ButtonProps.buttonIconSizes.includes(size)
	) {
		console.warn(
			`${componentName}: Invalid size "${size}". Expected one of: ${ButtonProps.buttonIconSizes.join(', ')}`
		);
	}

	if (
		componentName === 'Button' &&
		size &&
		!ButtonProps.buttonSizes.includes(size)
	) {
		console.warn(
			`${componentName}: Invalid size "${size}". Expected one of: ${ButtonProps.buttonSizes.join(', ')}`
		);
	}
};
