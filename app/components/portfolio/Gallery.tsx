import { setIsGalleryOpen } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const Gallery: React.FC = () => {
	const isOpen: boolean = useAppSelector(
		(state) => state.locationReducer.value.isGalleryOpen
	);
	const dispatch = useDispatch();

	const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(setIsGalleryOpen(false));
	};
	return (
		<div
			className="bg-paper-white-trans-0 w-screen h-screen fixed z-10 transition duration-700 backdrop-blur-sm"
			style={{ opacity: isOpen ? '1' : '0', pointerEvents: isOpen ? 'all' : 'none' }}
		>
			<button
				className="h-[2.5%] w-[2.5%] m-3 absolute right-3 group"
				onClick={(e) => handleClose(e)}
			>
				<img
					className="group-hover:rotate-[360deg] group-active:scale-[0%]  duration-1000"
					src="/doubleSharp.svg"
				/>
			</button>
		</div>
	);
};

export default Gallery;
