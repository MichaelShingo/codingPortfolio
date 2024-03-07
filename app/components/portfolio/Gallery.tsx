'use client';
import { setIsGalleryOpen } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { sampleJSON } from '@/app/utils/sampleData';

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
	type: 'tween',
	ease: 'easeOut',
	duration: 0.5,
};

const Gallery: React.FC = () => {
	const [imgIndex, setImgIndex] = useState<number>(0);
	const [dragging, setDragging] = useState<boolean>(false);
	const id: number = useAppSelector(
		(state) => state.locationReducer.value.selectedPortfolioId
	);
	const images: string[] = sampleJSON[id].images;

	const dragX = useMotionValue(0);
	const dragXProgress = useMotionValue(0);

	useMotionValueEvent(dragX, 'change', (latest) => {
		if (typeof latest === 'number' && dragging) {
			dragXProgress.set(latest);
		} else {
			dragXProgress.set(0);
		}
	});

	const isOpen: boolean = useAppSelector(
		(state) => state.locationReducer.value.isGalleryOpen
	);
	const dispatch = useDispatch();

	const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setImgIndex(0);
		dispatch(setIsGalleryOpen(false));
	};

	const onDragStart = () => {
		setDragging(true);
	};

	const toNextImage = () => {
		if (imgIndex < images.length - 1) {
			setImgIndex((prev) => prev + 1);
		}
	};
	const toPrevImage = () => {
		if (imgIndex > 0) {
			setImgIndex((prev) => prev - 1);
		}
	};

	const onDragEnd = () => {
		setDragging(false);
		const x = dragX.get();
		if (x <= -DRAG_BUFFER) {
			toNextImage();
		} else if (x >= DRAG_BUFFER) {
			toPrevImage();
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				toPrevImage();
			} else if (e.key === 'ArrowRight') {
				toNextImage();
			} else if (e.key === 'Escape') {
				dispatch(setIsGalleryOpen(false));
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	const Arrow: React.FC<{ rotation: string; position: string; onClick: () => void }> = ({
		rotation,
		position,
		onClick: handleClick,
	}) => {
		return (
			<div
				className={`absolute z-10 flex h-full w-[4vw] ${position} bottom-2 lg:bottom-0 items-end lg:items-center justify-center`}
			>
				<button
					className="group aspect-square w-[3vw] min-w-[40px] rounded-full border-[2px] border-none transition duration-300 hover:scale-[110%]"
					onClick={handleClick}
				>
					<img
						className={`h-full w-full duration-1000 rotate-${rotation}`}
						src="/quarterToneDown.svg"
					/>
				</button>
			</div>
		);
	};

	return (
		<section
			id="gallery"
			className="fixed z-50 h-full w-screen overflow-hidden bg-paper-white-trans-0 backdrop-blur-sm transition duration-700"
			style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
		>
			<Arrow rotation="180" position="right-4 lg:right-3" onClick={toNextImage} />
			<Arrow rotation="0" position="left-4 lg:left-1" onClick={toPrevImage} />
			<button
				className="group absolute right-1 z-50 m-1 aspect-square h-[6%] rounded-full bg-paper-white-trans-0 p-2 transition duration-300 sm:right-2 sm:m-3 sm:h-[6%] sm:bg-transparent sm:p-1"
				onClick={(e) => handleClose(e)}
			>
				<img
					className="h-full w-full duration-1000 group-hover:rotate-[180deg] group-active:scale-[0%]"
					src="/doubleSharp.svg"
				/>
			</button>
			<motion.div
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				style={{
					x: dragX,
				}}
				animate={{
					translateX: `-${imgIndex * 100}%`,
				}}
				className="flex cursor-grab items-center active:cursor-grabbing"
				transition={SPRING_OPTIONS}
			>
				<Images imgIndex={imgIndex} />
			</motion.div>
			<Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
		</section>
	);
};

interface ImagesProps {
	imgIndex: number;
}
const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
	const id: number = useAppSelector(
		(state) => state.locationReducer.value.selectedPortfolioId
	);
	const images: string[] = sampleJSON[id].images;
	const generateImages = (): ReactNode => {
		const res: ReactNode[] = [];
		for (let i = 0; i < images.length; i++) {
			res.push(
				<motion.div
					key={i}
					className="h-screen w-screen shrink-0 bg-contain bg-center bg-no-repeat"
					style={{
						backgroundImage: `url(${images[i]})`,
					}}
					animate={{
						scale: i === imgIndex ? 0.93 : 0.3,
						translateY: '-2%',
						opacity: i === imgIndex ? 1 : 0,
					}}
					transition={SPRING_OPTIONS}
				></motion.div>
			);
		}
		return res;
	};
	return <>{generateImages()}</>;
};

interface DotsProps {
	imgIndex: number;
	setImgIndex: Dispatch<SetStateAction<number>>;
}

const Dots: React.FC<DotsProps> = ({ imgIndex, setImgIndex }) => {
	const id: number = useAppSelector(
		(state) => state.locationReducer.value.selectedPortfolioId
	);
	const images: string[] = sampleJSON[id].images;
	return (
		<div className="absolute bottom-0 flex h-[50px] w-full items-center justify-center gap-4">
			{images.map((img, index) => {
				const isSelected: boolean = index === imgIndex;
				return (
					<button
						key={index}
						onClick={() => setImgIndex(index)}
						style={{ transform: isSelected ? '' : 'skew(-10deg, -8deg)' }}
						className={`flex items-center justify-center h-4 w-4 rounded-full transition duration-300 hover:scale-[120%] ${
							isSelected
								? 'bg-none border-black border-[2px] scale-[108%]'
								: 'bg-black border-none scale-[90%]'
						}`}
					>
						<div
							className={`absolute translate-y-[-50%] w-[2px] ${
								isSelected ? 'bg-black' : 'bg-black'
							} transition duration-300`}
							style={{
								width: isSelected ? '2px' : '1.5px',
								height: isSelected ? '100%' : '200%',
								transform: isSelected
									? 'translateY(-50%) skew(0deg, 0deg)'
									: 'translateY(50%) translateX(-350%) skew(8deg, 8deg)',
							}}
						></div>
					</button>
				);
			})}
		</div>
	);
};

export default Gallery;
