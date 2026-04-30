import * as Sentry from '@sentry/react';
Sentry.init({
	dsn: 'https://54ffbd70c0712ecd3f5ad49dfddbe8f3@o925438.ingest.us.sentry.io/4509871141683200',
	environment: process.env.NODE_ENV || 'development',
	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
	integrations: [
		// If you're using react router, use the integration for your react router version instead.
		// Learn more at
		// https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
		Sentry.browserTracingIntegration(),
	],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
	tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
	// Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
	tracePropagationTargets: [
		'localhost',
		/^http:\/\/localhost:\d+/,
		/^http:\/\/127\.0\.0\.1:5000/,
	],
});
