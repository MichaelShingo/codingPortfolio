'use client';
import { useAppSelector } from '@/redux/store';
import SelectionRect from './SelectionRect';
import { BoundingBox } from '@/redux/features/locationSlice';
import useIsSafari from '../navbar/useIsSafari';
import useIsMobile from '@/app/customHooks/useIsMobile';

const NavbarSelectionContainer = () => {
	const boundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.boundingBox
	);

	const { isSafari } = useIsSafari();
	const isMobileDevice = useIsMobile();

	return (
		<div
			id="navbar-selector"
			className={`pointer-events-none absolute h-screen w-screen`}
			style={{
				visibility: isSafari && isMobileDevice ? 'hidden' : 'visible',
			}}
		>
			<SelectionRect boundingBox={boundingBox} />
		</div>
	);
};

export default NavbarSelectionContainer;
