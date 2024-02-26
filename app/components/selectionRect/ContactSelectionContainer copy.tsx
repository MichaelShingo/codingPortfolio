'use client';
import { useAppSelector } from '@/redux/store';
import SelectionRect from './SelectionRect';
import { BoundingBox } from 'framer-motion';

const ContactSelectionContainer = () => {
	const boundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.contactFieldBoundingBox
	);
	return (
		<div className="absolute h-screen w-screen">
			<SelectionRect boundingBox={boundingBox} />
		</div>
	);
};

export default ContactSelectionContainer;
