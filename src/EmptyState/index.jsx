import React from 'react';

function EmptyState() {
	return (
		<div className="w-full flex items-center justify-center">
			<div className="text-center max-w-md mx-auto p-8">
				<div className="mb-6">
					<div className="w-24 h-24 mx-auto border-1 border-gray-300 rounded-2xl flex items-center justify-center mb-4 p-3">
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
					Enter a background color and at least one foreground color,
					then click{' '}
					<span className="font-semibold text-black">
						"Create Transparent Colors"
					</span>{' '}
					to see your color palette with transparency applied.
				</p>
			</div>
		</div>
	);
}

export default EmptyState;
