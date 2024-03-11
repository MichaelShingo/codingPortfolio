import { PortfolioItem } from '@/app/utils/sampleData';
import {
	setIsPortfolioDetailOpen,
	setSelectedPortfolioId,
} from '@/redux/features/locationSlice';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

interface PortfolioIconProps {
	itemId: number;
	horizontalPosition: number;
	verticalPosition: number;
	currentItem: PortfolioItem;
}

const PortfolioIcon: React.FC<PortfolioIconProps> = ({
	itemId,
	horizontalPosition,
	verticalPosition,
	currentItem,
}) => {
	const dispatch = useDispatch();
	const generateTags = (): ReactNode[] => {
		const res: ReactNode[] = [];
		for (let j = 0; j < currentItem.tags.length; j++) {
			res.push(
				<p
					key={j}
					className="w-fitrounded-sm m-1 bg-black px-1 py-[1px] text-paper-white"
				>
					{currentItem.tags[j]}
				</p>
			);
		}
		return res;
	};

	const handleClick = (): void => {
		dispatch(setSelectedPortfolioId(itemId));
		dispatch(setIsPortfolioDetailOpen(true));
	};

	return (
		<button
			key={itemId}
			onClick={handleClick}
			className={`group absolute z-10 flex aspect-square w-[65px] flex-row items-center justify-center bg-paper-white`}
			style={{
				left: `${horizontalPosition}px`,
				transform: `translateY(${verticalPosition}%) scale(100%)`,
			}}
		>
			<div className="absolute -z-10 h-[2px] w-[65%] translate-x-[0%] translate-y-[100%] bg-black opacity-0 transition duration-700 group-hover:translate-x-[100%] group-hover:opacity-100"></div>
			<img
				className="rounded-full border-[3px] border-black bg-paper-white"
				src={currentItem.logo}
			></img>
			<div className="pointer-events-none absolute h-fit min-w-[200px] translate-x-[50%] border-[2px] border-black bg-paper-white p-2 opacity-0 transition duration-700 group-hover:translate-x-[80%] group-hover:opacity-100">
				<p className="font-thin">
					{currentItem.title} - {currentItem.preview}
				</p>
				<div className="flex flex-row flex-wrap justify-center">{generateTags()}</div>
			</div>
		</button>
	);
};

export default PortfolioIcon;
