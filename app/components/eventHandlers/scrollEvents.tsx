'use client';
import { BoundingBox, setPage, setScrollY } from '@/redux/features/locationSlice';
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

	const windowHeight: number = useAppSelector(
		(state) => state.windowReducer.value.windowHeight
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	useEffect(() => {
		const detectSection = debounce((): void => {
			const scrollY: number = window.scrollY;
			dispatch(setScrollY(scrollY));
			console.log(
				scrollY,
				bioDimensions.bottomLeft.y,
				portfolioDimensions.bottomLeft.y,
				contactDimensions.bottomLeft.y
			);
			if (scrollY < bioDimensions.bottomLeft.y) {
				dispatch(setPage('Bio'));
			} else if (scrollY < portfolioDimensions.bottomLeft.y - 100) {
				dispatch(setPage('Portfolio'));
			} else if (scrollY < contactDimensions.bottomLeft.y) {
				dispatch(setPage('Contact'));
			}
		}, 200);
		window.addEventListener('scroll', detectSection);

		detectSection();

		return () => {
			window.removeEventListener('scroll', detectSection);
		};
	}, [bioDimensions, portfolioDimensions, contactDimensions, windowHeight, windowWidth]);

	return <></>;
};

export default ScrollEvents;
