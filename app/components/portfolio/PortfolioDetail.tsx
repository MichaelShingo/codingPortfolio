'use client';
import { PortfolioItem } from '@/app/utils/sampleData';
import { useAppSelector } from '@/redux/store';
import React from 'react';
import { sampleJSON } from '@/app/utils/sampleData';

const PortfolioDetail: React.FC = () => {
	const id: number = useAppSelector(
		(state) => state.locationReducer.value.selectedPortfolioId
	);
	const item: PortfolioItem = sampleJSON[id];

	return (
		<section className="fixed z-50 h-screen w-screen bg-paper-white px-3 text-5xl font-extrabold uppercase">
			<div className="flex h-[10%] w-full flex-row">
				<div className="hidden h-full w-[15%] sm:block"></div>
				<h1 className="h-full w-[85%]">{item.title}</h1>
			</div>
			<div className="flex h-[45%] w-full flex-col items-center justify-center space-y-5 sm:flex-row">
				<div className="h-full w-full border-[1px] border-black p-2 sm:w-[70%] sm:border-[2px]">
					<p className="text-sm font-thin normal-case">{item.description}</p>
				</div>
				<button className="group flex aspect-square h-full items-center justify-center border-[1px] border-black sm:w-[30%] sm:border-[2px]">
					<div
						id="background-image"
						className="flex h-full w-full items-center justify-center bg-[url('/imageIcon.svg')] bg-contain bg-center bg-no-repeat"
					>
						<div
							id="sun"
							className="relative aspect-square h-[10%] translate-x-[-175%] translate-y-[-130%] rounded-full bg-paper-white opacity-100 transition duration-[2000ms] group-hover:translate-y-[150%] group-hover:opacity-0"
						></div>
					</div>
				</button>
			</div>
			<div className="mt-5 h-[45%] w-full border-[1px] border-black sm:border-[2px]"></div>
		</section>
	);
};

export default PortfolioDetail;
