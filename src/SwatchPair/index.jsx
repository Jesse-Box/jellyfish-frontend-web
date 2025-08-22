import React from 'react';
import Swatch from './swatch.jsx';

function SwatchPair({ originalHex, rgba }) {
	return (
		<div className="flex flex-col">
			{/* Paired Swatches - No gap between original and transparent */}
			<div className="flex flex-col border border-white/20 rounded-md overflow-hidden">
				<Swatch
					color={originalHex}
					label="Original"
					value={originalHex}
				/>
				<Swatch color={rgba} label="Transparent" value={rgba} />
			</div>
		</div>
	);
}

export default SwatchPair;
