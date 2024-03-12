import { setIsDarkMode } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

const DarkModeToggle = () => {
	const dispatch = useDispatch();
	const isDarkMode: boolean = useAppSelector(
		(state) => state.locationReducer.value.isDarkMode
	);

	const isPortfolioDetailOpen: boolean = useAppSelector(
		(state) => state.locationReducer.value.isPortfolioDetailOpen
	);

	const generateTriangles = (): ReactNode[] => {
		const res: ReactNode[] = [];
		for (let i = 0; i < 8; i++) {
			res.push(<Triangle rotation={i * 45} />);
		}
		return res;
	};

	return (
		<button
			className={`fixed sm:right-3 sm:top-3 right-2 top-2 z-50 flex h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] items-center justify-center rounded-full transition duration-700 ${
				isPortfolioDetailOpen
					? 'pointer-events-none opacity-0'
					: 'pointer-events-auto opacity-100'
			}`}
			onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
		>
			{/* <div className="absolute z-20 h-full w-[100%] border-[2px] border-black"></div> */}
			<div
				className={`z-10 aspect-square h-[55%] transition duration-700 ${
					isDarkMode ? 'translate-x-[150%]' : 'translate-x-[60%]'
				} rounded-full bg-paper-white`}
			></div>
			<div
				className={`absolute aspect-square h-[55%] transition duration-700 ${
					isDarkMode ? 'translate-x-[0px] scale-[75%]' : 'translate-x-[3px] scale-[100%]'
				} rounded-full bg-black`}
			></div>
			{generateTriangles()}
		</button>
	);
};

const Triangle: React.FC<{
	rotation: number;
}> = ({ rotation }) => {
	const isDarkMode: boolean = useAppSelector(
		(state) => state.locationReducer.value.isDarkMode
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	const calcTranslateY = (): number => {
		if (isDarkMode) {
			if (windowWidth < 640) {
				return -12;
			}
			return -16;
		}
		return 0;
	};
	const triangleStyles = {
		width: 0,
		height: 0,
		borderBottomWidth: '6px',
		borderBottomColor: 'black',
		borderLeftWidth: '3px',
		borderLeftColor: 'transparent',
		borderRightWidth: '3px',
		borderRightColor: 'transparent',
		transform: `rotate(${rotation}deg) translateX(0px) translateY(${calcTranslateY()}px)`,
		opacity: isDarkMode ? '1' : '0',
	};

	return (
		<div
			className={`absolute z-30 origin-center transition duration-700`}
			style={triangleStyles}
		></div>
	);
};

export default DarkModeToggle;
