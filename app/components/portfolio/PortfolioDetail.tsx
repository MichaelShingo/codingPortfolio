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
import Gallery from './Gallery';

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
				<div key={i} className="hidden h-[3px] w-[100vw] bg-black sm:block"></div>
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
					className="flex h-[40px] w-fit min-w-[100px] items-center justify-center rounded-sm bg-black px-8"
				>
					<p className="text-center text-3xl font-thin uppercase text-paper-white">
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
			className="fixed z-50 flex h-[100vh] min-h-screen w-screen flex-col items-center overflow-x-hidden bg-paper-white px-4 transition duration-700 sm:overflow-y-hidden sm:px-16"
			style={{
				pointerEvents: isOpen ? 'all' : 'none',
				transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
			}}
		>
			<Gallery />
			<div
				id="header-container"
				className="flex w-full flex-col-reverse items-center justify-start sm:h-[100px] sm:flex-row sm:space-x-5"
			>
				<button
					onClick={handleBackClick}
					className="group mt-5 h-[78%] w-[100px] border-[2px] border-black bg-paper-white py-1 sm:mt-0 sm:w-[125px]"
				>
					<div className="h-full min-h-[60px] bg-[url('/repeatSign.svg')] bg-contain bg-center bg-no-repeat transition duration-700 sm:w-full"></div>
					<img
						src="/arrowLeft.svg"
						className="absolute -z-10 translate-x-[-75%] translate-y-[-115%] scale-[75%] transition duration-700 group-hover:translate-x-[-75%] sm:translate-x-[-10%]"
					/>
				</button>
				<div className="flex w-full flex-row items-center justify-center sm:justify-start">
					<h1 className="h-full w-fit text-center text-6xl font-extrabold uppercase sm:translate-y-[-5%] sm:text-left sm:text-8xl">
						{item.title}
					</h1>
				</div>
			</div>
			<div className="my-7 flex w-full flex-col items-center justify-center space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0">
				<div className="h-fit min-h-[32vh] w-full border-[2px] border-black p-5 sm:w-[70%]">
					<p className="text-lg font-thin normal-case sm:text-2xl">{item.description}</p>
				</div>
				<button
					onClick={handleImageClick}
					className="group flex min-h-[32vh] w-full items-center justify-center border-[2px] border-black sm:w-[30%]"
				>
					<div
						id="background-image"
						className="flex h-[28vh] w-[100%] items-center justify-center bg-[url('/imageIcon.svg')] bg-contain bg-center bg-no-repeat"
					>
						<div
							id="sun"
							className="relative hidden aspect-square h-[15%] translate-x-[-175%] translate-y-[150%] rounded-full bg-paper-white opacity-100 transition duration-[2000ms] group-hover:translate-y-[-130%] group-hover:opacity-100 sm:block"
						></div>
					</div>
				</button>
			</div>
			<div className="mt-5 flex min-h-[30vh] w-[100vw] flex-col items-center justify-start sm:space-y-14">
				{generateStaffLines()}
				<div className="relative flex flex-col items-center justify-center space-y-5 sm:absolute sm:translate-y-[4px] sm:flex-row sm:space-x-20 sm:space-y-0">
					{generateTags()}
				</div>
				<div
					id="barline-2"
					className="absolute right-1 hidden h-[235px] w-[50px] translate-y-[-54px] bg-black sm:block"
				></div>
				<div
					id="barline-1"
					className="absolute right-[80px] hidden h-[235px] w-[15px] translate-y-[-54px] bg-black sm:block"
				></div>
				<div
					id="link-container"
					className="mt-16 flex h-[60px] w-[50vw] flex-row items-center justify-center pb-10 sm:absolute sm:mt-0 sm:translate-y-[125px] sm:space-x-[200px] sm:pb-0"
				>
					<div
						id="github-button"
						className="group h-[60px] w-[60px] cursor-pointer bg-[url('/githubBody.svg')] bg-contain bg-no-repeat sm:absolute sm:translate-x-[-50px]"
					>
						<div className="h-[60px] w-[60px] origin-[100%_100%] translate-x-[-28px] translate-y-[-8px] rotate-[-20deg] scale-[42%] bg-[url('/githubArm.svg')] bg-contain bg-no-repeat transition-all duration-700 group-hover:rotate-[-7deg] sm:absolute"></div>
					</div>
					<button
						id="link-button"
						className="group flex h-[60px] w-[60px] translate-y-[-8%] scale-[115%] items-center justify-center transition duration-700 sm:translate-x-[-50px]"
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
