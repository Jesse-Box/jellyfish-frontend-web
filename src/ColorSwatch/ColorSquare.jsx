import React from 'react';

function ColorSquare({ color, label, value }) {
	return (
		<div
			className="w-full h-16 lg:h-20 relative flex items-center justify-center"
			style={{
				backgroundColor: color,
			}}
			title={`${label}: ${value}`}
		>
			<span className="text-xs font-bold text-white drop-shadow-lg px-1 text-center leading-tight">
				{value}
			</span>
		</div>
	);
}

export default ColorSquare;
