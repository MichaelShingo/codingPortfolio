'use client';
import { setPage, setBoundingBox, BoundingBox } from '@/redux/features/locationSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface NavbarItemProps {
	title: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title }) => {
	const currentPage: string = useAppSelector((state) => state.locationReducer.value.page);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);
	const ref = useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (currentPage === title && ref.current) {
			const rect: DOMRect = ref.current?.getBoundingClientRect();
			const newBoundingBox: BoundingBox = {
				topLeft: { x: rect.left, y: rect.top },
				topRight: { x: rect.right, y: rect.top },
				bottomRight: { x: rect.right, y: rect.bottom },
				bottomLeft: { x: rect.left, y: rect.bottom },
			};
			dispatch(setBoundingBox(newBoundingBox));
		}
	}, [currentPage, windowWidth, title, dispatch]);
	const handleOnClick = () => {
		dispatch(setPage(title));
	};
	return (
		<button
			ref={ref}
			onClick={handleOnClick}
			className="p-1 text-center text-xl font-light transition duration-300 hover:scale-[95%] sm:text-3xl md:text-5xl"
		>
			{title}
		</button>
	);
};

const Navbar: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={ref}
			className="fixed mt-4 flex h-fit w-screen flex-row items-center justify-center space-x-9 sm:space-x-11 md:space-x-20"
		>
			<NavbarItem title="Bio" />
			<NavbarItem title="Portfolio" />
			<NavbarItem title="Contact" />
		</div>
	);
};

export default Navbar;
