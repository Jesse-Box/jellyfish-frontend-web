import React from 'react';
import * as Sentry from '@sentry/react';
import Form from './Form/index.jsx';

function App() {
	return (
		<div>
			<div>
				<header className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-left">Jellyfish</h1>
					<span className="text-sm text-gray-600 font-medium">
						110% vibe coded
					</span>
				</header>
				<div>
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
