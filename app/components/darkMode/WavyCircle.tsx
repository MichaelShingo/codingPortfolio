import React from 'react';

const WavyCircle: React.FC = () => {
	return (
		<div className="wavy-circle-wrapper flex items-center justify-center">
			<div className="wavy-circle relative overflow-hidden">
				<div className="wave absolute bottom-0 left-0 h-10 w-full bg-gradient-to-r from-blue-500 via-transparent to-blue-500"></div>
			</div>
		</div>
	);
};

export default WavyCircle;
