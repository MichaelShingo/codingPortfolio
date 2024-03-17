'use client';
import MainButton from './MainButton';
import TypedText from './TypedText';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setIsIntroOpen } from '@/redux/features/locationSlice';

const Intro = () => {
	const dispatch = useDispatch();
	const isIntroOpen: boolean = useAppSelector(
		(state) => state.locationReducer.value.isIntroOpen
	);

	const handleEnterClick = () => {
		dispatch(setIsIntroOpen(false));
	};

	return (
		<section
			id="intro"
			className={`${
				isIntroOpen
					? 'opacity-1 pointer-events-auto'
					: 'opacity-0 dark:bg-transparent pointer-events-none'
			} fixed transition delay-500 duration-500 scroll flex h-screen w-screen flex-col items-center justify-evenly space-y-10 overflow-x-hidden overflow-y-hidden bg-paper-white dark:bg-black z-50`}
		>
			<div className="h-2/8 w-screen"></div>
			<h1 className="h-2/8 px-2 text-center text-6xl font-light sm:text-7xl md:text-8xl 2xl:text-9xl dark:text-white">
				Michael Shingo Crawford
			</h1>
			<TypedText />
			<div className="flex h-[200px] w-screen flex-row items-center justify-center overflow-x-hidden">
				<MainButton onClick={handleEnterClick} label="enter" />
			</div>
		</section>
	);
};

export default Intro;
