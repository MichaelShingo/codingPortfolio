'use client';
import { BoundingBox, setPage, setScrollY } from '@/redux/features/locationSlice';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

let lastY = 0;

const ScrollEvents = () => {
	const dispatch = useDispatch();
	const isScrollDisabled: boolean = useAppSelector(
		(state) =>
			state.locationReducer.value.isPortfolioDetailOpen ||
			state.locationReducer.value.isIntroOpen
	);
	// const isScrollDisabled = false;
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
		const htmlElement: HTMLCollection = document.getElementsByTagName('html');

		const detectSection = debounce((): void => {
			const scrollY: number = window.scrollY;
			dispatch(setScrollY(scrollY));

			if (scrollY < bioDimensions.bottomLeft.y - 325) {
				dispatch(setPage('Bio'));
			} else if (scrollY < portfolioDimensions.bottomLeft.y - 100) {
				dispatch(setPage('Portfolio'));
			} else if (scrollY < contactDimensions.bottomLeft.y) {
				dispatch(setPage('Contact'));
			}
		}, 200);

		const preventScroll = (): void => {
			if (isScrollDisabled) {
				htmlElement[0].scrollTop = lastY;
				return;
			}
			lastY = htmlElement[0].scrollTop;
		};

		const runScrollFunctions = () => {
			detectSection();
			preventScroll();
		};

		window.addEventListener('scroll', runScrollFunctions);
		detectSection();

		return () => {
			window.removeEventListener('scroll', runScrollFunctions);
		};
	}, [
		bioDimensions,
		portfolioDimensions,
		contactDimensions,
		windowHeight,
		windowWidth,
		isScrollDisabled,
	]);

	return <></>;
};

export default ScrollEvents;
