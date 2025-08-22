import React from 'react';

function Swatch({ color, label, value }) {
	return (
		<div
			className="w-full h-16 lg:h-20 relative flex items-end justify-start"
			style={{
				backgroundColor: color,
			}}
			title={`${label}: ${value}`}
		>
			<span className="text-xs font-bold text-white drop-shadow-lg px-2 py-1 text-center leading-tight bg-black/60 rounded">
				{value}
			</span>
		</div>
	);
}

export default Swatch;
