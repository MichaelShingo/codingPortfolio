'use client';
import {
	boundingClientRectToBoundingBox,
	setBioDimensions,
	setPage,
} from '@/redux/features/locationSlice';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { actions, useAppState } from '../../context/AppStateContext';
import { useAppSelector } from '@/redux/store';
export const paragraphStyles =
	' 2xl:text-3xl 2xl:leading-[45px] lg:text-2xl lg:leading-[40px] md:text-2xl md:leading-9 sm:text-base text-lg';

const Bio: React.FC = () => {
	const dispatch = useDispatch();
	const { state } = useAppState();
	const { dispatchContext } = useAppState();
	const bioSectionRef = useRef<HTMLElement | null>(null);
	const bioTextboxRef = useRef<HTMLDivElement | null>(null);
	const windowHeight: number = useAppSelector(
		(state) => state.windowReducer.value.windowHeight
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	const scrollToSection = () => {
		setTimeout(() => {
			bioSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 200);
	};
	useEffect(() => {
		if (bioSectionRef.current) {
			dispatchContext({ type: actions.SET_SCROLL_TO_BIO, payload: scrollToSection });
		}
	}, [bioSectionRef]);

	useEffect(() => {
		if (bioSectionRef.current) {
			const sectionBoundingBox: DOMRect = bioSectionRef.current.getBoundingClientRect();
			dispatch(setBioDimensions(boundingClientRectToBoundingBox(sectionBoundingBox)));
		}
	}, [windowHeight, windowWidth]);

	useEffect(() => {
		setTimeout(() => {
			dispatch(setPage('Bio'));
		}, 200);
	}, []);

	return (
		<section
			ref={bioSectionRef}
			className="-z-10 flex h-fit min-h-screen w-screen flex-col items-center pt-[120px]"
		>
			<div
				id="p-container"
				className={
					`top-5 flex h-fit w-[80%] flex-col items-center justify-center space-y-3 border-[3px] border-solid border-black bg-paper-white p-5 text-justify font-light sm:w-[55%] md:w-[70%] lg:p-8 2xl:w-[55%]` +
					paragraphStyles
				}
			>
				<p ref={bioTextboxRef}>
					I am a software developer and musician with a passion for exploring the
					intersections between tech and the arts, helping creative professionals advance
					their skills and careers. As a web developer proficient in React, Typescript,
					and Python, I craft seamless user experiences through robust and reliable
					functionality alongside intuitive, responsive, and beautiful UI. <br></br>
					<br></br>
				</p>
				<p>
					My expertise extends to backend and API development, granting me a holistic
					understanding of the applications to which I contribute. Beyond my numerous
					personal projects, I have collaborated with diverse teams and clients on both
					freelance and volunteer work, consistently delivering exceptional user
					experiences. With every application that I build, I strive to write clean,
					maintainable code while drawing from a rich palette of knowledge acquired
					through my dual roles as a developer and creative professional.
				</p>
			</div>
			<button
				id="arrow-container"
				onClick={() => state.scrollToPortfolio()}
				className="relative h-[15vh] w-[3px] bg-black transition-all duration-700 hover:h-[20vh]"
			>
				<div
					id="clickable-area"
					className="relative h-[120%] w-5 translate-x-[-50%] translate-y-[0%] bg-transparent"
				></div>
				<img
					src="/arrowHead.svg"
					className="absolute bottom-0 h-4 rotate-90 scale-[5] bg-center"
				/>
			</button>
		</section>
	);
};

export default Bio;
