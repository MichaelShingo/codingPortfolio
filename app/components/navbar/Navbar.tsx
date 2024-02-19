import React, { ReactNode } from 'react';

interface NavbarItemProps {
	title: ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title }) => {
	return (
		<button className="text-center text-xl font-light transition sm:text-3xl md:text-5xl">
			{title}
		</button>
	);
};

interface SelectionCornerProps {
	rotation: string;
	position: { x: string; y: string };
}

const SelectionCorner: React.FC<SelectionCornerProps> = ({ rotation, position }) => {
	return (
		<div
			className={`absolute h-[7px] w-[7px] border-r-2 border-t-2 border-black transition duration-1000`}
			style={{
				top: `${position.y}px`,
				left: `${position.x}px`,
				transform: `rotate(${rotation}deg)`,
			}}
		></div>
	);
};

const Navbar: React.FC = () => {
	return (
		<div className="absolute mt-4 flex h-fit w-screen flex-row items-center justify-center space-x-9 sm:space-x-11 md:space-x-20">
			<NavbarItem title="Bio" />
			<NavbarItem title="Portfolio" />
			<NavbarItem title="Contact" />
			<SelectionCorner rotation="0" position={{ x: '10', y: '10' }} />
			<SelectionCorner rotation="90" position={{ x: '10', y: '20' }} />
			<SelectionCorner rotation="180" position={{ x: '0', y: '20' }} />
			<SelectionCorner rotation="270" position={{ x: '0', y: '10' }} />
		</div>
	);
};

export default Navbar;
