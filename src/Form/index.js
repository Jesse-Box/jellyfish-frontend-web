import React, { useState } from 'react';
import InputGroup from '../InputGroup';

function Form() {
	const [backgroundColor, setBackgroundColor] = useState('');
	const [foregroundColor, setForegroundColor] = useState('');
	const [errors, setErrors] = useState({ background: '', foreground: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [response, setResponse] = useState(null);

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

		// Clear response when input changes
		if (response) {
			setResponse(null);
		}
	};

	const handleForegroundChange = e => {
		const value = e.target.value;
		setForegroundColor(value);

		// Clear error when user starts typing
		if (errors.foreground) {
			setErrors(prev => ({ ...prev, foreground: '' }));
		}

		// Clear response when input changes
		if (response) {
			setResponse(null);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Reset errors
		const newErrors = { background: '', foreground: '' };

		// Validate background color
		if (!backgroundColor.trim()) {
			newErrors.background = 'Please enter a background color';
		} else if (!isValidHexColor(backgroundColor)) {
			newErrors.background =
				'Please enter a valid hex color (e.g., #FF0000, #f00, FF0000, or f00)';
		}

		// Validate foreground color
		if (!foregroundColor.trim()) {
			newErrors.foreground = 'Please enter a foreground color';
		} else if (!isValidHexColor(foregroundColor)) {
			newErrors.foreground =
				'Please enter a valid hex color (e.g., #FF0000, #f00, FF0000, or f00)';
		}

		// Check if there are any errors
		if (newErrors.background || newErrors.foreground) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true);
		setErrors({ background: '', foreground: '' });

		try {
			const normalizedBackground = normalizeHexValue(backgroundColor);
			const normalizedForeground = normalizeHexValue(foregroundColor);

			// Send to your Flask backend using the API documentation format
			const response = await fetch('http://127.0.0.1:5000/api/colors/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					backgroundColor: normalizedBackground,
					foregroundColor: normalizedForeground,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setResponse(data);
		} catch (error) {
			setErrors({
				background: '',
				foreground: `Failed to send colors to backend: ${error.message}`,
			});
			console.error('Submit error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<InputGroup
					id="backgroundInput"
					label="Background Color"
					value={backgroundColor}
					onChange={handleBackgroundChange}
					error={errors.background}
					placeholder="e.g., #FFFFFF or ffffff"
				/>

				<InputGroup
					id="foregroundInput"
					label="Foreground Color"
					value={foregroundColor}
					onChange={handleForegroundChange}
					error={errors.foreground}
					placeholder="e.g., #000000 or 000000"
				/>

				{/* Submit Button */}
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Get Transparent Colors'}
				</button>
			</form>

			{/* Success Response */}
			{response && (
				<div style={{ color: 'green', marginTop: '15px' }}>
					<strong>✅ Success!</strong>
					{response.status === 'success' && response.results && (
						<div style={{ marginTop: '10px' }}>
							<p>Transparent Colors:</p>
							{response.results.map((result, index) => (
								<div
									key={index}
									style={{ marginBottom: '5px' }}
								>
									<span style={{ fontFamily: 'monospace' }}>
										{result.originalHex} → {result.rgba}
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Form;
