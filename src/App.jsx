import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import Form from './Form/index.jsx';
import Results from './Results/index.jsx';

function App() {
	const [response, setResponse] = useState(null);
	const [backgroundColor, setBackgroundColor] = useState('');

	const handleFormSubmit = async formData => {
		try {
			const normalizedBackground = formData.backgroundColor.startsWith(
				'#'
			)
				? formData.backgroundColor
				: `#${formData.backgroundColor}`;

			const normalizedForegroundColors = formData.foregroundColors
				.filter(color => color.trim())
				.map(color => (color.startsWith('#') ? color : `#${color}`));

			const apiResponse = await fetch(
				'https://jellyfish-backend.onrender.com/api/colors/',
				{
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
				}
			);

			if (!apiResponse.ok) {
				throw new Error(`HTTP error! status: ${apiResponse.status}`);
			}

			const data = await apiResponse.json();
			setResponse(data);
			setBackgroundColor(normalizedBackground);

			return { success: true };
		} catch (error) {
			console.error('Submit error:', error);
			return {
				success: false,
				error: `Failed to send colors to backend: ${error.message}`,
			};
		}
	};

	return (
		<div>
			<header className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-left">Jellyfish</h1>
				<span className="text-sm text-gray-600 font-medium">
					110% vibez
				</span>
			</header>

			<div className="flex flex-col lg:flex-row lg:h-screen gap-4 p-6">
				{/* Form Sidebar */}
				<div className="lg:w-80 lg:flex-shrink-0">
					<Form onSubmit={handleFormSubmit} />
				</div>

				{/* Results Panel */}
				<div className="lg:flex-1 lg:overflow-y-auto">
					<Results
						response={response}
						backgroundColor={backgroundColor}
					/>
				</div>
			</div>
		</div>
	);
}

export default Sentry.withErrorBoundary(App, {
	fallback: ({ error, resetError }) => (
		<div style={{ padding: '20px', textAlign: 'center' }}>
			<h2>Something went wrong</h2>
			<p>{error.message}</p>
			<button onClick={resetError}>Try again</button>
		</div>
	),
});
