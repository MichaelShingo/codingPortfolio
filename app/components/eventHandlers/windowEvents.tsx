'use client';
import { setHeight, setWidth } from '@/redux/features/windowSlice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const WindowEvents = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const setWindowSize = () => {
			dispatch(setHeight(window.innerHeight));
			dispatch(setWidth(window.innerWidth));
		};
		window.addEventListener('resize', setWindowSize);
	});
	return <></>;
};

export default WindowEvents;
