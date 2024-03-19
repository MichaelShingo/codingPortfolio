'use client';
import { BoundingBox, Coordinate } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import React from 'react';

interface SelectionCornerProps {
	position: Coordinate;
	xOffset: number;
	svgLink: string;
	isHaupt: boolean;
}

const SelectionCorner: React.FC<SelectionCornerProps> = ({
	position,
	xOffset: offset,
	svgLink,
	isHaupt,
}) => {
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	let scale: number = 1;
	if (windowWidth > 1280) {
		scale = 2.2;
	} else if (windowWidth > 768) {
		scale = 1.8;
	} else if (windowWidth > 640) {
		scale = 1.5;
	}

	if (isHaupt) {
		scale += 0.5;
	}

	return (
		<img
			src={svgLink}
			className={`sm-scale-150 pointer-events-none absolute left-0 top-0 z-50 h-[7px] w-[7px] origin-center transition duration-1000 dark:invert`}
			style={{
				transform: `translateX(${position.x + offset}px) translateY(${
					position.y
				}px) scale(${scale})`,
			}}
		/>
	);
};

interface SelectionRectProps {
	boundingBox: BoundingBox;
}

const SelectionRect: React.FC<SelectionRectProps> = ({ boundingBox }) => {
	return (
		<div className={`pointer-events-none fixed z-40 h-screen w-screen overflow-hidden`}>
			<SelectionCorner
				position={boundingBox.topRight}
				xOffset={9}
				svgLink="/selectionCorner0.svg"
				isHaupt={false}
			/>
			<SelectionCorner
				position={boundingBox.bottomRight}
				xOffset={9}
				svgLink="/selectionCorner90.svg"
				isHaupt={false}
			/>
			<SelectionCorner
				position={boundingBox.bottomLeft}
				xOffset={-19}
				svgLink="/selectionCorner180.svg"
				isHaupt={false}
			/>
			<SelectionCorner
				position={boundingBox.topLeft}
				xOffset={-19}
				svgLink="/hauptstimme.svg"
				isHaupt={true}
			/>
		</div>
	);
};

export default SelectionRect;
