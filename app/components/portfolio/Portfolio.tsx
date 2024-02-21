'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectToggleButton from './ProjectToggleButton';

const Portfolio = () => {
	const [showcase, setShowcase] = useState<boolean>(true);
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const xScroll = useTransform(scrollYProgress, [0, 1], ['0%', '-225%']);
	const buttonOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	const handleOnClick = () => {
		setShowcase((prev) => !prev);
	};

	return (
		<section className="z-50 flex h-[400vh] w-screen items-center justify-center bg-red-100">
			<div ref={ref} className="h-[400vh]">
				<motion.div className="sticky top-[5vh] flex h-[100px] w-screen flex-row items-center justify-center space-x-32 bg-red-200">
					<ProjectToggleButton
						title="showcase"
						active={showcase}
						onClick={handleOnClick}
					/>
					<ProjectToggleButton
						title="all projects"
						active={!showcase}
						onClick={handleOnClick}
					/>
				</motion.div>
				<motion.div
					style={{ x: xScroll }}
					className="overflow-show sticky top-[37vh] flex h-[200px] w-screen items-center bg-purple-300"
				>
					<div className="absolute h-[100px] w-[3000px] border-4 border-dashed border-black bg-black-trans"></div>
					{/* <img
						src="/chaconne.svg"
						className="pointer-events-none absolute left-[45%] top-[300%] scale-[200%]"
					/> */}
				</motion.div>
			</div>
		</section>
	);
};

export default Portfolio;
