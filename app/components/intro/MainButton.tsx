interface MainButtonProps {
	onClick: (() => void) | ((e: MouseEvent) => Promise<void>);
	label: string;
}

const MainButton: React.FC<MainButtonProps> = ({ onClick, label }) => {
	return (
		<>
			<button
				onClick={onClick}
				className="group peer z-10 flex h-[70px] w-[282px] items-center justify-center overflow-hidden bg-black transition duration-1000 ease-in-out hover:translate-x-[4px] hover:translate-y-[6px] hover:bg-black-trans"
			>
				<img
					src="/sibeliusViolinConcerto.svg"
					className="translate-y-36 opacity-0 group-hover:animate-scroll-music"
				/>
			</button>
			<p className="pointer-events-none absolute z-20 flex translate-y-[-6px] justify-center bg-none text-5xl font-thin text-paper-white opacity-100 transition duration-1000 ease-in-out peer-hover:-translate-y-12 peer-hover:scale-50 peer-hover:text-black">
				{label}
			</p>
			<div className="absolute z-0 flex h-[69px] w-[285px] translate-x-[4px] translate-y-[6px] items-center justify-center border-[3px] border-solid border-black bg-transparent transition ease-in-out"></div>
		</>
	);
};

export default MainButton;
