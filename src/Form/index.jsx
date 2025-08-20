import React, { useState } from 'react';
import InputGroup from '../InputGroup/index.jsx';
import { Button } from '../Button/index.jsx';
import Section from '../Section/index.jsx';

function Form({ onSubmit }) {
	const [backgroundColor, setBackgroundColor] = useState('');
	const [foregroundColors, setForegroundColors] = useState(['']);
	const [errors, setErrors] = useState({ background: '', foreground: [] });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Validate hex color format
	const isValidHexColor = value => {
		// Allow 3 or 6 digit hex colors with or without #
		const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		return hexRegex.test(value);
	};

	// Normalize hex value (ensure it has # prefix)
	const normalizeHexValue = value => {
		const cleanValue = value.trim();
		return cleanValue.startsWith('#') ? cleanValue : `#${cleanValue}`;
	};

	const handleBackgroundChange = e => {
		const value = e.target.value;
		setBackgroundColor(value);

		// Clear error when user starts typing
		if (errors.background) {
			setErrors(prev => ({ ...prev, background: '' }));
		}

		// Response is now handled by parent App component
	};

	const handleForegroundChange = (index, e) => {
		const value = e.target.value;
		const newForegroundColors = [...foregroundColors];
		newForegroundColors[index] = value;
		setForegroundColors(newForegroundColors);

		// Clear error for this specific input
		if (errors.foreground[index]) {
			const newErrors = [...errors.foreground];
			newErrors[index] = '';
			setErrors(prev => ({ ...prev, foreground: newErrors }));
		}
		// Response is now handled by parent App component
	};

	const addForegroundColor = () => {
		setForegroundColors([...foregroundColors, '']);
		setErrors(prev => ({ ...prev, foreground: [...prev.foreground, ''] }));
	};

	const removeForegroundColor = index => {
		if (foregroundColors.length > 1) {
			const newForegroundColors = foregroundColors.filter(
				(_, i) => i !== index
			);
			const newErrors = errors.foreground.filter((_, i) => i !== index);
			setForegroundColors(newForegroundColors);
			setErrors(prev => ({ ...prev, foreground: newErrors }));
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Reset errors
		const newErrors = { background: '', foreground: [] };

		// Validate background color
		if (!backgroundColor.trim()) {
			newErrors.background = 'Please enter a valid hex color!';
		} else if (!isValidHexColor(backgroundColor)) {
			newErrors.background = 'Please enter a valid hex color!';
		}

		// Validate foreground colors
		const foregroundErrors = [];
		let hasValidForeground = false;

		foregroundColors.forEach((color, index) => {
			if (!color.trim()) {
				foregroundErrors[index] = 'Please enter a valid hex color!';
			} else if (!isValidHexColor(color)) {
				foregroundErrors[index] = 'Please enter a valid hex color!';
			} else {
				foregroundErrors[index] = '';
				hasValidForeground = true;
			}
		});

		if (!hasValidForeground) {
			// If no valid foreground colors, mark first one as required
			if (foregroundErrors.length === 0 || !foregroundErrors[0]) {
				foregroundErrors[0] = 'Please enter a valid hex color!';
			}
		}

		newErrors.foreground = foregroundErrors;

		// Check if there are any errors
		const hasErrors =
			newErrors.background || foregroundErrors.some(error => error);
		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true);
		setErrors({ background: '', foreground: [] });

		try {
			const normalizedBackground = normalizeHexValue(backgroundColor);
			const normalizedForegroundColors = foregroundColors
				.filter(color => color.trim())
				.map(color => normalizeHexValue(color));

			const result = await onSubmit({
				backgroundColor: normalizedBackground,
				foregroundColors: normalizedForegroundColors,
			});

			if (!result.success) {
				setErrors({
					background: '',
					foreground: [result.error],
				});
			}
		} catch (error) {
			setErrors({
				background: '',
				foreground: [`Submission failed: ${error.message}`],
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			{/* Background Color Section */}
			<Section
				title="Background Color"
				validationError={errors.background}
			>
				<InputGroup
					id="backgroundInput"
					value={backgroundColor}
					onChange={handleBackgroundChange}
					hasError={!!errors.background}
					placeholder="e.g., #FFFFFF or ffffff"
				/>
			</Section>

			{/* Foreground Colors Section */}
			<Section
				title="Foreground Colors"
				showButton={true}
				onButtonClick={addForegroundColor}
				validationError={
					errors.foreground.some(error => error)
						? 'Please enter a valid hex color!'
						: ''
				}
			>
				{foregroundColors.map((color, index) => (
					<InputGroup
						key={index}
						id={`foregroundInput-${index}`}
						value={color}
						onChange={e => handleForegroundChange(index, e)}
						hasError={!!errors.foreground[index]}
						placeholder="e.g., #000000 or 000000"
						showRemoveButton={foregroundColors.length > 1}
						onRemove={() => removeForegroundColor(index)}
					/>
				))}
			</Section>

			{/* Submit Button */}
			<div className="flex">
				<Button type="submit" disabled={isSubmitting} fullWidth>
					{isSubmitting ? 'Sending...' : 'Create Transparent Colors'}
				</Button>
			</div>
		</form>
	);
}

export default Form;
