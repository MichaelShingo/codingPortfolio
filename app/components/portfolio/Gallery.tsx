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
		dispatch(setIsGalleryOpen(false));
	};

	const onDragStart = () => {
		setDragging(true);
	};

	const onDragEnd = () => {
		setDragging(false);
		const x = dragX.get();
		if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
			setImgIndex((prev) => prev + 1);
		} else if (x >= DRAG_BUFFER && imgIndex > 0) {
			setImgIndex((prev) => prev - 1);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft' && imgIndex > 0) {
				setImgIndex((prev) => prev - 1);
			} else if (e.key === 'ArrowRight' && imgIndex < images.length - 1) {
				setImgIndex((prev) => prev + 1);
			} else if (e.key === 'Escape') {
				dispatch(setIsGalleryOpen(false));
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	return (
		<div
			className="fixed z-10 h-screen w-screen overflow-hidden bg-paper-white-trans-0 backdrop-blur-sm transition duration-700"
			style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
		>
			<button
				className="group absolute right-3 z-10 m-3 h-[2.5%] w-[2.5%] opacity-50 transition duration-300 hover:opacity-100"
				onClick={(e) => handleClose(e)}
			>
				<img
					className="duration-1000 group-hover:rotate-[180deg] group-active:scale-[0%]"
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
		</div>
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
								: 'bg-paper-grey border-none scale-[90%]'
						}`}
					>
						<div
							className={`absolute translate-y-[-50%] w-[2px] ${
								isSelected ? 'bg-black' : 'bg-paper-grey'
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
