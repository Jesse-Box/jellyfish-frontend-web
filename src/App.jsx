import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import Form from './Form/index.jsx';
import Results from './Results/index.jsx';

const BACKEND_URL = 'https://jellyfish-backend.onrender.com';

function App() {
	const [response, setResponse] = useState(null);
	const [backgroundColor, setBackgroundColor] = useState('');
	const [isWarmingUp, setIsWarmingUp] = useState(true);

	// Ping the backend on mount to trigger Render cold-start early,
	// before the user submits the form.
	useEffect(() => {
		fetch(`${BACKEND_URL}/`)
			.catch(() => {
				// Ignore ping errors — we just want to wake the service up.
			})
			.finally(() => {
				setIsWarmingUp(false);
			});
	}, []);

	const handleFormSubmit = async formData => {
		try {
			const normalizeColor = color => {
				if (/^(rgb|hsl|hwb|oklch|lch|lab)\(/i.test(color)) {
					return color;
				}
				return color.startsWith('#') ? color : `#${color}`;
			};

			const normalizedBackground = normalizeColor(
				formData.backgroundColor
			);

			const normalizedForegroundColors = formData.foregroundColors
				.filter(color => color.trim())
				.map(normalizeColor);

			const requestBody = JSON.stringify({
				backgroundColor: normalizedBackground,
				foregroundColor:
					normalizedForegroundColors.length === 1
						? normalizedForegroundColors[0]
						: normalizedForegroundColors,
			});

			const doFetch = () =>
				fetch(`${BACKEND_URL}/api/colors/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: requestBody,
				});

			let apiResponse;
			try {
				apiResponse = await doFetch();
			} catch (networkError) {
				// NetworkError likely means the backend is still cold-starting.
				// Wait 3 s and retry once before surfacing the error.
				await new Promise(resolve => setTimeout(resolve, 3000));
				apiResponse = await doFetch();
			}

			if (!apiResponse.ok) {
				throw new Error(`HTTP error! status: ${apiResponse.status}`);
			}

			const data = await apiResponse.json();
			setResponse(data);
			setBackgroundColor(normalizedBackground);

			return { success: true };
		} catch (error) {
			console.error('Submit error:', error);
			Sentry.captureException(error);
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

			{isWarmingUp && (
				<div className="px-6 py-2 bg-yellow-50 border-b border-yellow-200 text-sm text-yellow-700">
					Connecting to server…
				</div>
			)}

			<div className="flex flex-col lg:flex-row lg:h-screen gap-4 p-6">
				{/* Form Sidebar */}
				<div className="lg:w-80 lg:flex-shrink-0">
					<Form onSubmit={handleFormSubmit} isDisabled={isWarmingUp} />
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
