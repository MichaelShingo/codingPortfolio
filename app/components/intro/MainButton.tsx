'use client';
import { ReactNode, useState } from 'react';
import { useAppSelector } from '@/redux/store';

interface MainButtonProps {
	onClick:
		| (() => void)
		| ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>);
	label: string;
}

type LinkObj = { link: string; x: string; y: string };
const icons: LinkObj[] = [
	{ link: '/eighthNote.svg', x: '120px', y: '0%' },
	{ link: '/eighthRest.svg', x: '-100px', y: '0%' },
	{ link: '/segno.svg', x: '-100px', y: '0%' },
	{ link: '/halfNote.svg', x: '-25px', y: '0%' },
	{ link: '/sixteenthNote.svg', x: '100%', y: '0%' },
];

const MainButton: React.FC<MainButtonProps> = ({ onClick, label }) => {
	const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);
	const windowWidth = useAppSelector((state) => state.windowReducer.value.windowWidth);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onClick(e);
		setTriggerAnimation(true);
		setTimeout(() => {
			setTriggerAnimation(false);
		}, 1700);
	};

	const generateIcons = (): ReactNode[] => {
		const res: ReactNode[] = [];

		for (let i = 0; i < icons.length; i++) {
			const animationName: string = triggerAnimation
				? `animate-main-button-click-${i}`
				: '';
			res.push(
				<img
					key={i}
					src={icons[i].link}
					className={`pointer-events-none absolute aspect-square h-[50px] opacity-0 ${animationName} dark:invert`}
					style={{
						transform: `translateX(${icons[i].x})`,
					}}
				/>
			);
		}
		return res;
	};

	return (
		<>
			<button
				onClick={(e) => handleClick(e)}
				className="group peer z-10 flex h-[70px] w-[282px] items-center justify-center overflow-hidden bg-black transition duration-1000 ease-in-out hover:translate-x-[4px] hover:translate-y-[6px] hover:bg-transparent dark:bg-white"
			>
				<div
					className={`pointer-events-none absolute h-[80%] w-[650px] ${
						windowWidth <= 1024 ? 'hidden' : 'visible'
					}`}
				>
					<img
						src="/sibeliusViolinConcerto.png"
						className="absolute h-full w-[1000px] translate-y-36 opacity-0 group-hover:animate-scroll-music dark:invert"
					/>
				</div>
			</button>
			{generateIcons()}
			<p
				className={`pointer-events-none absolute z-20 flex translate-y-[-6px] justify-center bg-none text-5xl font-thin text-paper-white opacity-100 transition duration-1000 ease-in-out ${
					windowWidth <= 1024
						? 'peer-hover:translate-y-[-2px]'
						: 'peer-hover:-translate-y-12 peer-hover:scale-50'
				} peer-hover:text-black dark:text-black dark:peer-hover:text-paper-white`}
			>
				{label}
			</p>
			<div className="absolute z-0 flex h-[69px] w-[285px] translate-x-[4px] translate-y-[6px] items-center justify-center border-[3px] border-solid border-black bg-transparent transition ease-in-out dark:border-white"></div>
		</>
	);
};

export default MainButton;
