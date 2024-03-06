'use client';
import { PortfolioItem } from '@/app/utils/sampleData';
import { useAppSelector } from '@/redux/store';
import React, { ReactNode } from 'react';
import { sampleJSON } from '@/app/utils/sampleData';
import { useDispatch } from 'react-redux';
import {
	setIsGalleryOpen,
	setIsPortfolioDetailOpen,
} from '@/redux/features/locationSlice';
import { paragraphStyles } from '../bio/Bio';

const PortfolioDetail: React.FC = () => {
	const dispatch = useDispatch();
	const isOpen: boolean = useAppSelector(
		(state) => state.locationReducer.value.isPortfolioDetailOpen
	);
	const id: number = useAppSelector(
		(state) => state.locationReducer.value.selectedPortfolioId
	);
	const item: PortfolioItem = sampleJSON[id];

	const handleBackClick = () => {
		dispatch(setIsPortfolioDetailOpen(false));
	};

	const generateStaffLines = (): ReactNode => {
		const res: ReactNode[] = [];
		for (let i = 0; i < 5; i++) {
			res.push(
				<div key={i} className="hidden h-[3px] w-[100vw] bg-black lg:block"></div>
			);
		}
		return res;
	};

	const generateTags = (): ReactNode => {
		const res: ReactNode[] = [];
		for (const tag of item.tags) {
			res.push(
				<div
					key={tag}
					className="flex h-[40px] w-fit min-w-[100px] items-center justify-center rounded-md bg-black px-8"
				>
					<p className="pb-3 pt-2 text-center text-3xl font-light text-paper-white">
						{tag}
					</p>
				</div>
			);
		}
		return res;
	};

	const handleImageClick = () => {
		dispatch(setIsGalleryOpen(true));
	};
	return (
		<section
			id="portfolio-detail"
			className="fixed z-40 flex h-[100vh] min-h-screen w-screen flex-col items-center justify-between overflow-x-hidden bg-paper-white px-4 transition duration-700 lg:px-16"
			style={{
				pointerEvents: isOpen ? 'all' : 'none',
				transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
			}}
		>
			<div
				id="header-container"
				className="mt-3 flex w-full flex-col-reverse items-center justify-start lg:flex-row lg:space-x-5"
			>
				<button
					onClick={handleBackClick}
					className="group mt-5 h-[78%] min-h-[110px] min-w-[170px] border-[2px] border-black bg-paper-white px-2 py-1 lg:mt-0 lg:min-w-[90px]"
				>
					<div className="h-full min-h-[20px] bg-[url('/repeatSign.svg')] bg-contain bg-center bg-no-repeat transition duration-700 lg:w-full"></div>
					<img
						src="/arrowLeft.svg"
						className="absolute -z-10 translate-x-[-75%] translate-y-[-115%] scale-[75%] transition duration-700 group-hover:translate-x-[-75%] lg:translate-x-[-10%]"
					/>
				</button>
				<div className="flex w-full flex-row items-center justify-center lg:justify-start">
					<h1 className="h-full w-fit text-center text-6xl font-extrabold uppercase sm:text-8xl lg:translate-y-[-5%] lg:text-left xl:text-9xl">
						{item.title}
					</h1>
				</div>
			</div>
			<div className="my-7 flex w-full flex-col items-center justify-center space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
				<div className="h-fit min-h-[32vh] w-full border-[2px] border-black p-5 lg:w-[70%]">
					<p className={`text-lg font-thin normal-case lg:text-2xl` + paragraphStyles}>
						{item.description}
					</p>
				</div>
				<button
					onClick={handleImageClick}
					className="group flex min-h-[32vh] w-full items-center justify-center border-[2px] border-black lg:h-full lg:w-[30%]"
				>
					<div
						id="background-image"
						className="flex h-[28vh] w-[100%] items-center justify-center bg-[url('/imageIcon.svg')] bg-contain bg-center bg-no-repeat"
					>
						<div
							id="sun"
							className="relative aspect-square h-[15%] max-h-[35px] translate-x-[-175%] translate-y-[150%] rounded-full bg-paper-white transition duration-[2000ms] group-hover:translate-y-[-130%] xl:max-h-[50px]"
						></div>
					</div>
				</button>
			</div>
			<div className="mb-10 mt-5 flex min-h-[30vh] w-[100vw] flex-col items-center justify-start lg:space-y-14">
				{generateStaffLines()}
				<div className="relative flex flex-col items-center justify-center space-y-5 lg:absolute lg:translate-y-[4px] lg:flex-row lg:space-x-20 lg:space-y-0">
					{generateTags()}
				</div>
				<div
					id="barline-2"
					className="absolute right-0 hidden h-[235px] w-[60px] translate-y-[-54px] bg-black lg:block"
				></div>
				<div
					id="barline-1"
					className="absolute right-[80px] hidden h-[235px] w-[15px] translate-y-[-54px] bg-black lg:block"
				></div>
				<div
					id="link-container"
					className="mt-16 flex h-[60px] w-[50vw] flex-row items-center justify-center pb-10 lg:absolute lg:mt-0 lg:translate-y-[125px] lg:space-x-[200px] lg:pb-0"
				>
					<div
						id="github-button"
						className="group h-[60px] w-[60px] cursor-pointer bg-[url('/githubBody.svg')] bg-contain bg-no-repeat lg:absolute lg:translate-x-[-50px]"
					>
						<div className="h-[60px] w-[60px] origin-[100%_100%] translate-x-[-28px] translate-y-[-8px] rotate-[-20deg] scale-[42%] bg-[url('/githubArm.svg')] bg-contain bg-no-repeat transition-all duration-700 group-hover:rotate-[-7deg] lg:absolute"></div>
					</div>
					<button
						id="link-button"
						className="group flex h-[60px] w-[60px] translate-y-[-8%] scale-[115%] items-center justify-center transition duration-700 lg:translate-x-[-50px]"
					>
						<div
							id="top-link"
							className="absolute h-1/2 w-1/2 translate-x-[27%] translate-y-[5%] rotate-180 bg-[url('/linkIcon.svg')] bg-contain bg-no-repeat group-hover:translate-x-[30%] group-hover:translate-y-[2%]"
						></div>
						<div
							id="bottom-link"
							className="absolute h-1/2 w-1/2 translate-x-[-20%] translate-y-[20%] bg-[url('/linkIcon.svg')] bg-contain bg-no-repeat group-hover:translate-x-[-23%] group-hover:translate-y-[23%]"
						></div>
					</button>
				</div>
			</div>
		</section>
	);
};

export default PortfolioDetail;
