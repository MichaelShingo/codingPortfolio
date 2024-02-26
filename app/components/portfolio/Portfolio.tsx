'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ProjectToggleButton from './ProjectToggleButton';
import { useAppSelector } from '@/redux/store';
import { sampleJSON } from '@/app/utils/sampleData';

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
	const [filteredPortfolioData, setFilteredPortfolioData] = useState<PortfolioItem[]>(
		portfolioData.filter((item) => item.showcase)
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);
	const verticalScrollRef = useRef<HTMLDivElement | null>(null);

	const { scrollYProgress } = useScroll({ target: verticalScrollRef });
	const xScroll = useTransform(scrollYProgress, [0, 1], ['0%', '-230%']);

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

	const handleOnClick = () => {
		setIsShowcase((prev) => !prev);
	};

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

			const generateTags = (): ReactNode[] => {
				const res: ReactNode[] = [];
				for (const tag of currentItem.tags) {
					res.push(
						<p className="m-1 w-fit rounded-sm bg-black px-1 py-[1px] text-paper-white">
							{tag}
						</p>
					);
				}
				return res;
			};

			res.push(
				<button
					key={i}
					className={`group absolute z-10 flex aspect-square w-[65px] flex-row items-center justify-center rounded-full border-[2px] border-black bg-paper-white transition duration-700`}
					style={{
						left: `${horizontalPosition}px`,
						transform: `translateY(${verticalPosition}%) scale(100%)`,
					}}
				>
					<div className="absolute -z-10 h-[2px] w-[65%] translate-x-[0%] translate-y-[100%] bg-black opacity-0 transition duration-700 group-hover:translate-x-[100%] group-hover:opacity-100"></div>
					<img className="" src={filteredPortfolioData[i].logo}></img>
					<div className="pointer-events-none absolute max-h-[150px] min-w-[200px] translate-x-[50%] border-[2px] border-black bg-paper-white p-2 opacity-0 transition duration-700 group-hover:translate-x-[80%] group-hover:opacity-100">
						<p className="font-thin">
							{currentItem.title} - {currentItem.preview}
						</p>
						<div className="flex flex-row justify-center">{generateTags()}</div>
					</div>
				</button>
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

	useEffect(() => {
		console.log(windowWidth);
	}, [windowWidth]);

	return (
		<section className="">
			{windowWidth > 640 ? (
				<div ref={verticalScrollRef} className="relative h-[400vh]">
					<div className="sticky top-[12vh] flex h-[100px] w-screen scale-[65%] flex-row items-center justify-center space-x-14 sm:scale-100 sm:space-x-32">
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
				<section className="flex min-h-screen flex-col items-center">
					<div className="mb-8 flex h-fit w-screen scale-[65%] flex-col items-center justify-center space-y-10 sm:scale-100">
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
