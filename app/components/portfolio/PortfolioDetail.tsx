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
			res.push(<div className="h-[3px] w-[100vw] bg-black"></div>);
		}
		return res;
	};

	const generateTags = (): ReactNode => {
		const res: ReactNode[] = [];
		for (const tag of item.tags) {
			res.push(
				<div className="flex h-[40px] w-fit min-w-[100px] items-center justify-center rounded-sm bg-black px-8">
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
			className="fixed z-50 flex h-[500px] min-h-screen w-screen flex-col items-center overflow-x-hidden overflow-y-hidden bg-paper-white px-16 transition duration-700"
			style={{
				pointerEvents: isOpen ? 'all' : 'none',
				transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
			}}
		>
			<Gallery />
			<div className="flex w-full flex-row items-center justify-start space-x-5 sm:h-[100px]">
				<button
					onClick={handleBackClick}
					className="group hidden h-[78%] w-[125px] border-[2px] border-black bg-paper-white py-1 sm:block"
				>
					<div className="h-full w-full translate-x-[15%] bg-[url('/repeatSign.svg')] bg-contain bg-no-repeat transition duration-700"></div>
					<img
						src="/arrowLeft.svg"
						className="absolute -z-10 translate-x-[-10%] translate-y-[-115%] scale-[75%] transition duration-700 group-hover:translate-x-[-75%]"
					/>
				</button>
				<div className="flex w-full flex-row items-center">
					<h1 className="h-full w-[85%] translate-y-[-5%] text-5xl font-extrabold uppercase sm:text-8xl">
						{item.title}
					</h1>
				</div>
			</div>
			<div className="my-9 flex w-full flex-col items-center justify-center space-x-5 space-y-5 sm:flex-row sm:space-y-0">
				<div className="min-h-[32vh] w-full border-[1px] border-black p-2 sm:w-[70%] sm:border-[2px] sm:p-5">
					<p className="text-sm font-thin normal-case sm:text-2xl">{item.description}</p>
				</div>
				<button
					onClick={handleImageClick}
					className="group flex min-h-[32vh] items-center justify-center border-[1px] border-black sm:w-[30%] sm:border-[2px]"
				>
					<div
						id="background-image"
						className="flex h-[28vh] w-[100%] items-center justify-center bg-[url('/imageIcon.svg')] bg-contain bg-center bg-no-repeat"
					>
						<div
							id="sun"
							className="relative aspect-square h-[15%] translate-x-[-175%] translate-y-[150%] rounded-full bg-paper-white opacity-100 transition duration-[2000ms] group-hover:translate-y-[-130%] group-hover:opacity-100"
						></div>
					</div>
				</button>
			</div>
			<div className="justify- mt-5 flex min-h-[30vh] w-[100vw] flex-col items-center justify-start space-y-14">
				{generateStaffLines()}
				<div className="absolute flex translate-y-[4px] flex-row space-x-20">
					{generateTags()}
				</div>
				<div
					id="barline-2"
					className="absolute right-1 h-[235px] w-[50px] translate-y-[-54px] bg-black"
				></div>
				<div
					id="barline-1"
					className="absolute right-[80px] h-[235px] w-[15px] translate-y-[-54px] bg-black"
				></div>
				<div
					id="link-container"
					className="absolute flex h-[60px] w-[50vw] translate-y-[125px] flex-row items-center justify-center space-x-[200px]"
				>
					<div
						id="github-button"
						className="group absolute h-[60px] w-[60px] translate-x-[-50px] cursor-pointer bg-[url('/githubBody.svg')] bg-contain bg-no-repeat"
					>
						<div className="absolute h-[60px] w-[60px] origin-[100%_100%] translate-x-[-28px] translate-y-[-8px] rotate-[-20deg] scale-[42%] bg-[url('/githubArm.svg')] bg-contain bg-no-repeat transition-all duration-700 group-hover:rotate-[-7deg]"></div>
					</div>
					<button className="group h-[60px] w-[60px] translate-x-[-50px] translate-y-[-8%] flex justify-center items-center scale-[115%] transition duration-700">
						<div
							id="top-link"
							className="absolute h-1/2 w-1/2 translate-x-[27%] translate-y-[5%] rotate-180 bg-[url('/linkIcon.svg')] bg-contain bg-no-repeat group-hover:translate-y-[2%] group-hover:translate-x-[30%]"
						></div>
						<div
							id="bottom-link"
							className="absolute h-1/2 w-1/2 translate-x-[-20%] translate-y-[20%]  bg-[url('/linkIcon.svg')] bg-contain bg-no-repeat group-hover:translate-y-[23%] group-hover:translate-x-[-23%]"
						></div>
					</button>
				</div>
			</div>
		</section>
	);
};

export default PortfolioDetail;
