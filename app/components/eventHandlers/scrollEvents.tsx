'use client';
import { BoundingBox, setPage } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

const ScrollEvents = () => {
	const dispatch = useDispatch();
	const bioDimensions: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.bioDimensions
	);
	const portfolioDimensions: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.portfolioDimensions
	);
	const contactDimensions: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.contactDimensions
	);

	useEffect(() => {
		const detectSection = debounce((): void => {
			const scrollY: number = window.scrollY;
			// console.log(
			// 	scrollY,
			// 	bioDimensions.bottomLeft.y,
			// 	portfolioDimensions.bottomLeft.y,
			// 	contactDimensions.bottomLeft.y
			// );
			if (scrollY < bioDimensions.bottomLeft.y) {
				dispatch(setPage('Bio'));
			} else if (scrollY < portfolioDimensions.bottomLeft.y - 100) {
				dispatch(setPage('Portfolio'));
			} else if (scrollY < contactDimensions.bottomLeft.y) {
				dispatch(setPage('Contact'));
			}
		}, 200);
		window.addEventListener('scroll', detectSection);

		return () => {
			window.removeEventListener('scroll', detectSection);
		};
	}, [bioDimensions, portfolioDimensions, contactDimensions]);

	return <></>;
};

export default ScrollEvents;
