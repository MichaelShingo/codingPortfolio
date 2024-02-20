'use client';
import { BoundingBox, Coordinate } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';

interface SelectionCornerProps {
	rotation: number;
	position: Coordinate;
	scale: number;
	xOffset: number;
	svgLink: string;
}

const SelectionCorner: React.FC<SelectionCornerProps> = ({
	rotation,
	position,
	scale,
	xOffset: offset,
	svgLink,
}) => {
	return (
		<img
			src={svgLink}
			className={`pointer-events-none absolute left-0 top-0 z-10 h-[7px] w-[7px] origin-center transition duration-1000`}
			style={{
				transform: `rotate(${rotation}deg) translateX(${
					position.x + offset
				}px) translateY(${position.y}px) scale(${scale})`,
			}}
		/>
	);
};

const SelectionRect = () => {
	const boundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.boundingBox
	);

	return (
		<div className="pointer-events-none absolute h-screen w-screen overflow-hidden">
			<SelectionCorner
				rotation={0}
				position={boundingBox.topRight}
				scale={1}
				xOffset={0}
				svgLink="/selectionCorner0.svg"
			/>
			<SelectionCorner
				rotation={0}
				position={boundingBox.bottomRight}
				scale={1}
				xOffset={0}
				svgLink="/selectionCorner90.svg"
			/>
			<SelectionCorner
				rotation={0}
				position={boundingBox.bottomLeft}
				scale={1}
				xOffset={-9}
				svgLink="/selectionCorner180.svg"
			/>
			<SelectionCorner
				rotation={0}
				position={boundingBox.topLeft}
				scale={1.5}
				xOffset={-9}
				svgLink="/hauptstimme.svg"
			/>
		</div>
	);
};

export default SelectionRect;
