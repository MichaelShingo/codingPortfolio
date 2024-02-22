'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ProjectToggleButton from './ProjectToggleButton';
import { useAppSelector } from '@/redux/store';

const sampleJSON = [
	{
		title: 'Miitronome',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
	},
	{
		title: 'Violintice',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
	},
	{
		title: 'For the Lost Creative',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
	},
	{
		title: 'AnnaLyze',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
	},
	{
		title: 'Miitronome',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: false,
	},
	{
		title: 'Violintice',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: false,
	},
	{
		title: 'For the Lost Creative',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: false,
	},
	{
		title: 'AnnaLyze',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: false,
	},
];

type PortfolioItem = {
	title: string;
	preview: string;
	tags: string[];
	logo: string;
	showcase: boolean;
};

const Portfolio = () => {
	const [isShowcase, setIsShowcase] = useState<boolean>(true);
	const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
	const [filteredPortfolioData, setFilteredPortfolioData] = useState<PortfolioItem[]>([]);

	const verticalScrollRef = useRef<HTMLDivElement | null>(null);
	const horizontalScrollRef = useRef<HTMLDivElement | null>(null);

	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);
	const { scrollYProgress } = useScroll({ target: verticalScrollRef });
	const xScroll = useTransform(scrollYProgress, [0, 1], ['0%', '-230%']);
	const buttonOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	console.log(scrollYProgress);

	useEffect(() => {
		setTimeout(() => {
			setPortfolioData(sampleJSON);
			setFilteredPortfolioData(sampleJSON);
		}, 1000);
	}, []);

	useEffect(() => {
		if (isShowcase) {
			setFilteredPortfolioData(portfolioData.filter((item) => item.showcase));
		} else {
			setFilteredPortfolioData(portfolioData);
		}
	}, [isShowcase]);

	const handleOnClick = () => {
		setIsShowcase((prev) => !prev);
	};

	useEffect(() => {}, [windowWidth]);

	const generatePortfolioItems = (containerWidth: number): ReactNode[] => {
		const res: ReactNode[] = [];
		if (!horizontalScrollRef.current) {
			return res;
		}

		const containerIncrements: number = containerWidth / filteredPortfolioData.length;

		for (let i = 0; i < filteredPortfolioData.length; i++) {
			const positionVariance: number = (Math.random() - 0.5) * 50;
			const offset: number = positionVariance + 300;
			const horizontalPosition: number = Math.round(i * containerIncrements) + offset;
			const isAbove: number = i % 2 === 0 ? -1 : 1;
			const verticalPosition = isAbove * 250 + positionVariance;

			res.push(
				<button
					className={`absolute z-10 aspect-square w-[65px] rounded-full border-[2px] border-black bg-paper-white transition duration-700`}
					style={{
						left: `${horizontalPosition}px`,
						transform: `translateY(${verticalPosition}%) scale(100%)`,
					}}
				>
					<img src={filteredPortfolioData[i].logo}></img>
				</button>
			);
		}
		return res;
	};

	return (
		<section className="z-50 flex h-[400vh] w-screen items-center justify-center">
			<div ref={verticalScrollRef} className="h-[400vh]">
				<div className="sticky top-[12vh] flex h-[100px] w-screen flex-row items-center justify-center space-x-32">
					<ProjectToggleButton
						title="showcase"
						active={isShowcase}
						onClick={handleOnClick}
					/>
					<ProjectToggleButton
						title="all projects"
						active={!isShowcase}
						onClick={handleOnClick}
					/>
				</div>
				<motion.div
					style={{ x: xScroll }}
					className="overflow-show sticky top-[26vh] w-screen items-center justify-center"
				>
					<div
						ref={horizontalScrollRef}
						className="flex h-[70vh] w-[4vw] items-center justify-center"
					>
						{portfolioData && generatePortfolioItems(windowWidth * 2)}
						<img
							src="/chaconne.svg"
							className="pointer-events-none absolute left-[55%] scale-[200%]"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Portfolio;
