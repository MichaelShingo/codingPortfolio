'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ProjectToggleButton from './ProjectToggleButton';
import { useAppSelector } from '@/redux/store';
import { sampleJSON } from '@/app/utils/sampleData';
import { useDispatch } from 'react-redux';
import {
	boundingClientRectToBoundingBox,
	setPortfolioDimensions,
} from '@/redux/features/locationSlice';

import { actions, useAppState } from '../../context/AppStateContext';
import PortfolioIcon from './PortfolioIcon';

type PortfolioItem = {
	title: string;
	preview: string;
	tags: string[];
	logo: string;
	showcase: boolean;
};

const Portfolio = () => {
	const dispatch = useDispatch();
	const { dispatchContext } = useAppState();
	const portfolioSectionRef = useRef<HTMLElement | null>(null);

	const scrollToSection = () => {
		setTimeout(() => {
			portfolioSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 200);
	};

	useEffect(() => {
		if (portfolioSectionRef.current) {
			dispatchContext({
				type: actions.SET_SCROLL_TO_PORTFOLIO,
				payload: scrollToSection,
			});
		}
	}, [portfolioSectionRef]);

	const [isShowcase, setIsShowcase] = useState<boolean>(true);
	const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
	const [filteredPortfolioData, setFilteredPortfolioData] = useState<PortfolioItem[]>(
		portfolioData.filter((item) => item.showcase)
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);
	const windowHeight: number = useAppSelector(
		(state) => state.windowReducer.value.windowHeight
	);
	const verticalScrollRef = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: verticalScrollRef });
	const xScroll = useTransform(scrollYProgress, [0, 1], ['80%', '-210%']);

	useEffect(() => {
		setTimeout(() => {
			setPortfolioData(sampleJSON);
		}, 1000);
	}, []);

	useEffect(() => {
		if (isShowcase) {
			setFilteredPortfolioData(portfolioData.filter((item) => item.showcase));
		} else {
			setFilteredPortfolioData(portfolioData);
		}
	}, [isShowcase, portfolioData]);

	const handleClick = () => {
		setIsShowcase((prev) => !prev);
	};

	useEffect(() => {
		if (portfolioSectionRef.current) {
			const sectionBoundingBox: DOMRect =
				portfolioSectionRef.current.getBoundingClientRect();
			setTimeout(() => {
				dispatch(
					setPortfolioDimensions(boundingClientRectToBoundingBox(sectionBoundingBox))
				);
			});
		}
	}, [windowHeight, windowWidth]);

	const generatePortfolioItems = (containerWidth: number): ReactNode[] => {
		const res: ReactNode[] = [];
		const containerIncrements: number = containerWidth / filteredPortfolioData.length;

		for (let i = 0; i < filteredPortfolioData.length; i++) {
			const currentItem = filteredPortfolioData[i];
			const positionVariance: number = (Math.random() - 0.5) * 50;
			const offset: number = positionVariance + 400;
			const horizontalPosition: number = Math.round(i * containerIncrements) + offset;
			const isAbove: number = i % 2 === 0 ? -1 : 1;
			const verticalPosition = isAbove * 250 + positionVariance;

			res.push(
				<PortfolioIcon
					key={i}
					horizontalPosition={horizontalPosition}
					verticalPosition={verticalPosition}
					currentItem={currentItem}
				/>
			);
		}
		return res;
	};

	const generateMobilePortfolioItems = (): ReactNode[] => {
		const res: ReactNode[] = [];

		for (let i = 0; i < filteredPortfolioData.length; i++) {
			res.push(
				<button
					key={i}
					className={`z-10 aspect-square w-[45%] translate-x-[50%] flex-row rounded-full border-[2px] border-black bg-paper-white transition duration-700`}
				>
					<img className="" src={filteredPortfolioData[i].logo}></img>
				</button>
			);
		}
		return res;
	};

	return (
		<section ref={portfolioSectionRef} className="z-0 h-[400vh] min-h-screen">
			{windowWidth > 640 ? (
				<div ref={verticalScrollRef} className="relative h-[400vh]">
					<div className="sticky top-[12vh] flex h-[100px] w-screen scale-[65%] flex-row items-center justify-center space-x-14 sm:scale-100 sm:space-x-32">
						<ProjectToggleButton
							title="showcase"
							active={isShowcase}
							onClick={handleClick}
						/>
						<ProjectToggleButton
							title="all projects"
							active={!isShowcase}
							onClick={handleClick}
						/>
					</div>
					<motion.div
						style={{ x: xScroll }}
						className="overflow-show sticky top-[26vh] w-screen items-center justify-center"
					>
						<div className="flex h-[70vh] w-[4vw] items-center justify-center overflow-x-hidden">
							{filteredPortfolioData && generatePortfolioItems(windowWidth * 2)}
							<img
								src="/chaconne.svg"
								className="pointer-events-none absolute left-[55%] scale-[200%]"
							/>
						</div>
					</motion.div>
				</div>
			) : (
				<section className="flex min-h-[150vh] flex-col items-center">
					<div className="mb-8 flex h-fit w-screen scale-[65%] flex-col items-center justify-center space-y-10 sm:scale-100">
						<ProjectToggleButton
							title="showcase"
							active={isShowcase}
							onClick={handleClick}
						/>
						<ProjectToggleButton
							title="all projects"
							active={!isShowcase}
							onClick={handleClick}
						/>
					</div>
					<div className="grid h-fit w-screen grid-cols-2 gap-y-20">
						{generateMobilePortfolioItems()}
					</div>
				</section>
			)}
		</section>
	);
};

export default Portfolio;

// root of the problem is, on mobile, the svg causes page to overflow-x and become scrollable. How do you prevent scroll?
// and the browser doesn't recognize that the outer container is scrolling vertically until half way down
