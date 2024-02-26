'use client';

import { setScrollToBio } from '@/redux/features/locationSlice';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const Bio: React.FC = () => {
	const dispatch = useDispatch();

	const bioSectionRef = useRef<HTMLElement | null>(null);

	const scrollToSection = () => {
		if (bioSectionRef.current) {
			bioSectionRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		dispatch(setScrollToBio(scrollToSection));
	}, []);

	return (
		<section
			ref={bioSectionRef}
			className="z-50 flex h-fit min-h-screen w-screen justify-center overflow-hidden"
		>
			<div className="flex h-fit w-[80%] translate-y-[100px] flex-col items-center justify-center space-y-3 border-[3px] border-solid border-black bg-paper-white p-5 text-justify text-sm font-light sm:w-[55%] sm:translate-y-[125px] sm:text-base md:w-[70%] md:translate-y-[150px] md:text-lg lg:text-2xl 2xl:w-[55%] 2xl:text-3xl 2xl:leading-10">
				<div className="">
					<p className="">
						I am a software developer and musician with a passion for exploring the
						intersections between tech and the arts, helping creative professionals
						advance their skills and careers. As a web developer proficient in React,
						Typescript, and Python, I craft seamless user experiences through robust and
						reliable functionality alongside intuitive, responsive, and beautiful UI.{' '}
						<br></br>
						<br></br>
					</p>
					<p className="">
						My expertise extends to backend and API development, granting me a holistic
						understanding of the applications to which I contribute. Beyond my numerous
						personal projects, I have collaborated with diverse teams and clients on both
						freelance and volunteer work, consistently delivering exceptional user
						experiences. With every application that I build, I strive to write clean,
						maintainable code while drawing from a rich palette of knowledge acquired
						through my dual roles as a developer and creative professional.
					</p>
				</div>
				<button className="absolute bottom-0 h-[10%] w-[3px] translate-y-[100%] bg-black transition-all duration-700 hover:h-[15%] md:h-[30%] md:hover:h-[35%]">
					<div className="absolute h-[120%] w-5 translate-x-[-50%] translate-y-[-50%] bg-transparent"></div>
					<img
						src="/arrowHead.svg"
						className="absolute bottom-0 h-4 translate-y-[70%] rotate-90 scale-[5] bg-center"
					/>
				</button>
			</div>
		</section>
	);
};

export default Bio;
