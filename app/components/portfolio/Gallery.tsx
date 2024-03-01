import { setIsGalleryOpen } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { sampleJSON } from '@/app/utils/sampleData';

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
	type: 'spring',
	mass: 3,
	stiffness: 400,
	damping: 50,
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

	return (
		<div
			className="bg-paper-white-trans-0 w-screen h-screen fixed z-10 transition duration-700 backdrop-blur-sm overflow-hidden"
			style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
		>
			<button
				className="h-[2.5%] w-[2.5%] m-3 absolute right-3 group z-10"
				onClick={(e) => handleClose(e)}
			>
				<img
					className="group-hover:rotate-[360deg] group-active:scale-[0%]  duration-1000"
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
				className="flex items-center cursor-grab active:cursor-grabbing"
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
						scale: i === imgIndex ? 0.95 : 0.65,
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
		<div className="absolute bottom-0 flex h-[50px]  w-full  justify-center gap-2 items-center">
			{images.map((img, index) => {
				return (
					<button
						key={index}
						onClick={() => setImgIndex(index)}
						className={`h-3 w-3 rounded-full transition-colors ${
							index === imgIndex ? 'bg-paper-white' : 'bg-red-500'
						}`}
					/>
				);
			})}
		</div>
	);
};

export default Gallery;
