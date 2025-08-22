import React from 'react';
import ColorSquare from './colorSquare.jsx';

function ColorSwatch({ originalHex, rgba }) {
	return (
		<div className="flex flex-col">
			{/* Paired Swatches - No gap between original and transparent */}
			<div className="flex flex-col border border-white/20 rounded-md overflow-hidden">
				<ColorSquare
					color={originalHex}
					label="Original"
					value={originalHex}
				/>
				<ColorSquare color={rgba} label="Transparent" value={rgba} />
			</div>
		</div>
	);
}

export default ColorSwatch;