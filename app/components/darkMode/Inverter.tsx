'use client';

import { useAppSelector } from '@/redux/store';

export const colorList: string[] = [
	'bg-red-300',
	'bg-gradient-to-r from-cyan-500 to-blue-500',
];
const Inverter = () => {
	const isDarkMode: boolean = useAppSelector(
		(state) => state.locationReducer.value.isDarkMode
	);
	return (
		<>
			<div
				className={`pointer-events-none fixed z-[600] h-[100vh] w-[100vw] bg-paper-white ${
					isDarkMode ? 'opacity-100' : 'opacity-0'
				} mix-blend-multiply`}
			></div>
			{/* <div
				className={`pointer-events-none fixed z-[60] h-[100vh] w-[100vw] bg-white ${
					isDarkMode ? 'scale-[110%]' : 'scale-[0%]'
				} mix-blend-difference transition duration-700`}
			> */}
			{/* <div
				className={`pointer-events-none fixed z-[60] h-[100vh] w-[100vw] bg-purple-400 ${
					isDarkMode ? 'scale-[110%]' : 'scale-[0%]'
				} mix-blend-hard-light transition duration-700`}
			> */}
			{/* <div className="h-full w-full bg-white mix-blend-saturation"></div> */}
		</>
	);
};

export default Inverter;
