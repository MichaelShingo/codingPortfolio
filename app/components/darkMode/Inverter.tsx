'use client';

import { useAppSelector } from '@/redux/store';

const Inverter = () => {
	const isDarkMode: boolean = useAppSelector(
		(state) => state.locationReducer.value.isDarkMode
	);
	return (
		<>
			<div
				className={`pointer-events-none fixed z-[60] h-[100vh] w-[100vw] bg-white ${
					isDarkMode ? 'scale-[110%]' : 'scale-[0%]'
				} mix-blend-difference transition duration-700`}
			>
				{/* <div className="h-full w-full bg-white mix-blend-saturation"></div> */}
			</div>
		</>
	);
};

export default Inverter;
