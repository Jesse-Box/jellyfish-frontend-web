import React from 'react';
import Section from '../Section/index.jsx';
import Alert from '../Alert/index.jsx';
import ColorSwatch from '../ColorSwatch/index.jsx';
import EmptyState from '../EmptyState/index.jsx';

function Results({ response, backgroundColor }) {
	return (
		<div className="lg:h-full">
			<Section title="Color Results">
				{response &&
					response.status === 'success' &&
					response.results && (
						<Alert variant="success">
							Colors generated successfully!
						</Alert>
					)}

				{/* Visual Color Preview */}
				<div
					className="rounded-lg border-1 border-gray-300 lg:h-full lg:flex lg:items-center p-3"
					style={{
						backgroundColor:
							response &&
							response.status === 'success' &&
							response.results
								? response.backgroundColor || backgroundColor
								: 'white',
					}}
				>
					{response &&
					response.status === 'success' &&
					response.results ? (
						<div className="w-full">
							{/* Color Grid - Original vs Transparent */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
								{response.results.map((result, index) => (
									<ColorSwatch
										key={index}
										originalHex={result.originalHex}
										rgba={result.rgba}
									/>
								))}
							</div>
						</div>
					) : (
						<EmptyState />
					)}
				</div>
			</Section>
		</div>
	);
}

export default Results;
