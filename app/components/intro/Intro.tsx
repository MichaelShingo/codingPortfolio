'use client';
import { useState } from 'react';
import MainButton from './MainButton';
import TypedText from './TypedText';

const Intro = () => {
	const [isIntroActive, setIsIntroActive] = useState<boolean>(true);

	const handleEnterClick = () => {
		setIsIntroActive(false);
	};

	return (
		<div
			className={`${
				isIntroActive ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'
			} transition duration-1000 scroll flex h-screen w-screen flex-col items-center justify-evenly space-y-10 overflow-x-hidden absolute bg-paper-white z-50`}
		>
			<div className="h-2/8 w-screen"></div>
			<h1 className="h-2/8 text-center text-6xl font-light sm:text-7xl md:text-8xl 2xl:text-9xl">
				Michael Shingo Crawford
			</h1>
			<TypedText />
			<div className="h-2/8 flex h-[200px] w-screen flex-row items-center justify-center overflow-x-hidden">
				<MainButton onClick={handleEnterClick} />
			</div>
		</div>
	);
};

export default Intro;
