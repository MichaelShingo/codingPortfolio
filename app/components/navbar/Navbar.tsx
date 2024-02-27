'use client';
import {
	setPage,
	setBoundingBox,
	BoundingBox,
	boundingClientRectToBoundingBox,
} from '@/redux/features/locationSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface NavbarItemProps {
	title: string;
	scrollFunction: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title, scrollFunction }) => {
	const currentPage: string = useAppSelector((state) => state.locationReducer.value.page);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	const ref = useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (currentPage === title && ref.current) {
			const rect: DOMRect = ref.current?.getBoundingClientRect();
			const newBoundingBox: BoundingBox = boundingClientRectToBoundingBox(rect);
			dispatch(setBoundingBox(newBoundingBox));
		}
	}, [currentPage, windowWidth, title, dispatch]);

	const handleOnClick = () => {
		dispatch(setPage(title));
		scrollFunction();
	};

	return (
		<button
			ref={ref}
			onClick={handleOnClick}
			className="p-1 text-center text-xl font-normal uppercase transition duration-300 hover:scale-[95%] sm:text-3xl md:text-5xl"
		>
			{title}
		</button>
	);
};

const Navbar: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);

	const scrollToContact = useAppSelector(
		(state) => state.locationReducer.value.scrollToContact
	);
	const scrollToBio = useAppSelector((state) => state.locationReducer.value.scrollToBio);
	const scrollToPortfolio = useAppSelector(
		(state) => state.locationReducer.value.scrollToPortfolio
	);

	return (
		<div
			ref={ref}
			className="fixed z-40 flex h-fit w-screen flex-row items-center justify-center space-x-9 bg-paper-white py-4 sm:space-x-11 md:space-x-20"
		>
			<NavbarItem scrollFunction={scrollToBio} title="Bio" />
			<NavbarItem scrollFunction={scrollToPortfolio} title="Portfolio" />
			<NavbarItem scrollFunction={scrollToContact} title="Contact" />
		</div>
	);
};

export default Navbar;
