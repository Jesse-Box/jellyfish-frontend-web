import * as Sentry from '@sentry/react';
Sentry.init({
	dsn: 'https://ebf364761c2f8fb8656c62f5c609415e@o4508250680918016.ingest.de.sentry.io/4508851684376656',
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
