import React, { useState } from 'react';
import InputGroup from '../InputGroup/index.jsx';
import { Button } from '../Button/index.jsx';
import Section from '../Section/index.jsx';
import Alert from '../Alert/index.jsx';

function Form() {
	const [backgroundColor, setBackgroundColor] = useState('');
	const [foregroundColors, setForegroundColors] = useState(['']);
	const [errors, setErrors] = useState({ background: '', foreground: [] });
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
		if (response) {
			setResponse(null);
		}
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

			// Send to your Flask backend using the API documentation format
			const response = await fetch('http://127.0.0.1:5000/api/colors/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					backgroundColor: normalizedBackground,
					foregroundColor:
						normalizedForegroundColors.length === 1
							? normalizedForegroundColors[0]
							: normalizedForegroundColors,
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
				foreground: [
					`Failed to send colors to backend: ${error.message}`,
				],
			});
			console.error('Submit error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col lg:flex-row lg:h-screen gap-4 p-6">
			{/* Form Sidebar */}
			<div className="lg:w-80 lg:flex-shrink-0 lg:overflow-y-auto">
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
							{isSubmitting
								? 'Sending...'
								: 'Create Transparent Colors'}
						</Button>
					</div>
				</form>
			</div>

			{/* Results Panel */}
			<div className="lg:flex-1 lg:overflow-y-auto">
				{response &&
				response.status === 'success' &&
				response.results ? (
					<div className="lg:h-full">
						<Section title="Color Results">
							<Alert variant="success">
								Colors generated successfully!
							</Alert>

							{/* Visual Color Preview */}
							<div
								className="rounded-lg border-2 border-gray-200 lg:h-full lg:flex lg:items-center p-3"
								style={{
									backgroundColor:
										response.backgroundColor ||
										backgroundColor,
								}}
							>
								<div className="w-full">
									{/* Color Grid - Original vs Transparent */}
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
										{response.results.map(
											(result, index) => (
												<div
													key={index}
													className="flex flex-col"
												>
													{/* Paired Swatches - No gap between original and transparent */}
													<div className="flex flex-col border border-white/20 rounded-md overflow-hidden">
														{/* Original Color */}
														<div
															className="w-full h-16 lg:h-20 relative flex items-center justify-center"
															style={{
																backgroundColor:
																	result.originalHex,
															}}
															title={`Original: ${result.originalHex}`}
														>
															<span className="text-xs font-bold text-white drop-shadow-lg px-1 text-center leading-tight">
																{
																	result.originalHex
																}
															</span>
														</div>
														{/* Transparent Color - No gap */}
														<div
															className="w-full h-16 lg:h-20 relative flex items-center justify-center"
															style={{
																backgroundColor:
																	result.rgba,
															}}
															title={`Transparent: ${result.rgba}`}
														>
															<span className="text-xs font-bold text-white drop-shadow-lg px-1 text-center leading-tight">
																{result.rgba}
															</span>
														</div>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						</Section>
					</div>
				) : (
					<Section title="Color Results">
						<div className="rounded-lg border-1 border-gray-300 lg:h-full lg:flex lg:items-center bg-gray-50">
							<div className="w-full flex items-center justify-center">
								<div className="text-center max-w-md mx-auto p-8">
									<div className="mb-6">
										<div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4 p-3">
											<div className="grid grid-cols-3 gap-1 w-full h-full">
												<div className="bg-red-400 rounded-sm"></div>
												<div className="bg-blue-500 rounded-sm"></div>
												<div className="bg-green-500 rounded-sm"></div>
												<div className="bg-yellow-400 rounded-sm"></div>
												<div className="bg-purple-500 rounded-sm"></div>
												<div className="bg-pink-400 rounded-sm"></div>
												<div className="bg-indigo-500 rounded-sm"></div>
												<div className="bg-teal-400 rounded-sm"></div>
												<div className="bg-orange-400 rounded-sm"></div>
											</div>
										</div>
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										No colors generated yet
									</h3>
									<p className="text-gray-600 text-sm leading-relaxed mb-6">
										Enter a background color and at least
										one foreground color, then click "Create
										Transparent Colors" to see your color
										palette with transparency applied.
									</p>
								</div>
							</div>
						</div>
					</Section>
				)}
			</div>
		</div>
	);
}

export default Form;
