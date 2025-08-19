const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		sentryWebpackPlugin({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: 'jesse-box',
			project: 'jellyfish-frontend-web',
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 8000,
		open: true,
		hot: true,
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	devtool: 'source-map',
};
