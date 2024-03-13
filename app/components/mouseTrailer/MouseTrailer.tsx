'use client';
import { useAppSelector } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';

const MouseTrailer = () => {
	const isCursorInWindow: boolean = useAppSelector(
		(state) => state.windowReducer.value.isCursorInWindow
	);
	const [mouseY, setMouseY] = useState<number>(0);
	const [mouseX, setMouseX] = useState<number>(0);
	const [isInteractable, setIsInteractable] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);
	const keyframes = {
		transform: `translateX(${mouseX}px) translateY(${mouseY}px) ${
			isInteractable ? 'scale(500%)' : 'scale(100%)'
		}`,
	};
	ref.current?.animate(keyframes, {
		duration: 800,
		fill: 'forwards',
	});

	useEffect(() => {
		console.log(isInteractable);
	}, [isInteractable]);

	useEffect(() => {
		let trailerHeight: number = 20;
		let trailerWidth: number = 20;

		if (ref.current) {
			trailerWidth = ref.current.offsetWidth / 2;
			trailerHeight = ref.current.offsetHeight / 2;
		}
		const handleMouseMove = (e: MouseEvent) => {
			const hoveredElement: Element | null = (e.target as HTMLElement).closest('button');
			if (hoveredElement !== null) {
				setIsInteractable(true);
			} else {
				setIsInteractable(false);
			}
			setMouseX(e.clientX - trailerWidth);
			setMouseY(e.clientY - trailerHeight);
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={`pointer-events-none fixed z-[5000] h-[20px] w-[20px] transition duration-500 rounded-full ${
				isInteractable ? 'bg-paper-white' : 'bg-black'
			} ${isCursorInWindow ? 'opacity-50' : 'opacity-0'}`}
			style={{}}
		></div>
	);
};

export default MouseTrailer;
