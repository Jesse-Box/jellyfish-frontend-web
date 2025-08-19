import React from 'react';
import * as Sentry from '@sentry/react';
import Form from './Form';

function App() {
	return (
		<>
			<h1>Jellyfish Frontend</h1>
			<Form />
		</>
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
