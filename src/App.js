import React from 'react';
import * as Sentry from '@sentry/react';
import Form from './Form';

function App() {
	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
					Jellyfish Frontend
				</h1>
				<div className="bg-white rounded-lg shadow-lg p-6">
					<Form />
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
