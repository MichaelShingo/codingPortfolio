'use client';
import { useAppSelector } from '@/redux/store';
import SelectionRect from './SelectionRect';
import { BoundingBox } from 'framer-motion';

const NavbarSelectionContainer = () => {
	const boundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.boundingBox
	);
	return (
		<div id="navbar-selector" className="pointer-events-none absolute h-screen w-screen">
			<SelectionRect boundingBox={boundingBox} />
		</div>
	);
};

export default NavbarSelectionContainer;
