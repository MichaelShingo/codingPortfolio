interface ProjectToggleButtonProps {
	title: string;
	active: boolean;
	onClick: () => void;
}

const ProjectToggleButton: React.FC<ProjectToggleButtonProps> = ({
	title,
	active,
	onClick,
}) => {
	return (
		<button
			onClick={active ? () => {} : onClick}
			className="group h-fit w-fit transition-all duration-300 ease-linear"
		>
			<div
				className={`flex transition-all duration-300 h-[60px] w-[240px] items-center justify-center border-[3px] px-5 pt-4 ${
					active ? 'bg-black border-black' : 'bg-transparent border-none'
				}`}
			>
				<h2
					className={`translate-y-[-35%] text-4xl font-thin transition-all duration-700 group-active:scale-[50%]  ${
						active ? 'text-paper-white' : 'text-black'
					}`}
				>
					{title}
				</h2>
			</div>
			<div className="absolute h-[64px] w-[245px] translate-x-[1px] translate-y-[-103%] border-[1px] border-black transition-all duration-300 ease-linear group-hover:h-[59px] group-hover:w-[240px] group-hover:border-paper-white group-hover:opacity-0"></div>
			<div className="absolute h-[65px] w-[245px] translate-x-[-5px] translate-y-[-94%] border-[1px] border-black transition-all duration-300 ease-linear group-hover:h-[60px] group-hover:w-[240px] group-hover:translate-x-[0px] group-hover:translate-y-[-100%] group-hover:border-paper-white group-hover:opacity-0"></div>
		</button>
	);
};

export default ProjectToggleButton;
