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
import { useAppState } from '../../context/AppStateContext';

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
		setTimeout(() => {
			if (currentPage === title && ref.current) {
				const rect: DOMRect = ref.current?.getBoundingClientRect();
				const newBoundingBox: BoundingBox = boundingClientRectToBoundingBox(rect);
				dispatch(setBoundingBox(newBoundingBox));
			}
		}, 500);
	}, [currentPage, windowWidth, title, dispatch]);

	const handleClick = () => {
		dispatch(setPage(title));
		scrollFunction();
	};

	return (
		<button
			ref={ref}
			onClick={handleClick}
			className="p-1 text-center text-xl font-normal uppercase text-black transition duration-300 hover:scale-[95%] sm:text-3xl md:text-5xl dark:text-white"
		>
			{title}
		</button>
	);
};

const Navbar: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { state } = useAppState();

	const scrollToContact = state.scrollToContact;
	const scrollToBio = state.scrollToBio;
	const scrollToPortfolio = state.scrollToPortfolio;

	return (
		<nav
			ref={ref}
			className="fixed z-30 flex h-fit w-screen flex-row items-center justify-center space-x-9 bg-paper-white py-4 transition sm:space-x-11 md:space-x-20 dark:bg-black"
		>
			<NavbarItem scrollFunction={scrollToBio} title="Bio" />
			<NavbarItem scrollFunction={scrollToPortfolio} title="Portfolio" />
			<NavbarItem scrollFunction={scrollToContact} title="Contact" />
		</nav>
	);
};

export default Navbar;
