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
		<section className="fixed z-50 flex h-[500px] min-h-screen w-screen flex-col items-center overflow-y-auto overflow-x-hidden bg-paper-white px-16">
			<div className="flex w-full flex-row items-center justify-start space-x-5 sm:h-[100px]">
				<button className="group hidden h-[78%] w-[125px] border-[2px] border-black bg-paper-white py-1 sm:block">
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
				<div className="min-h-[42vh] w-full border-[1px] border-black p-2 sm:w-[70%] sm:border-[2px] sm:p-5">
					<p className="text-sm font-thin normal-case sm:text-2xl">{item.description}</p>
				</div>
				<button className="group flex min-h-[42vh] items-center justify-center border-[1px] border-black sm:w-[30%] sm:border-[2px]">
					<div
						id="background-image"
						className="flex h-[35vh] w-[100%] items-center justify-center bg-[url('/imageIcon.svg')] bg-contain bg-center bg-no-repeat"
					>
						<div
							id="sun"
							className="relative aspect-square h-[15%] translate-x-[-175%] translate-y-[-130%] rounded-full bg-paper-white opacity-100 transition duration-[2000ms] group-hover:translate-y-[150%] group-hover:opacity-0"
						></div>
					</div>
				</button>
			</div>
			<div className="mt-5 min-h-[50vh] w-[100vw]">
				<div className="mx-auto h-[50vh] w-[102vw] translate-x-[-0.5%] bg-[url('/musicStaff.svg')] bg-contain bg-no-repeat"></div>
			</div>
		</section>
	);
};

export default PortfolioDetail;
