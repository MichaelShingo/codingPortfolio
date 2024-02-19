const Bio: React.FC = () => {
	return (
		<div className="flex h-screen w-screen translate-y-[15%] justify-center">
			<div className="flex h-fit w-[90%] flex-col space-y-3 border-[3px] border-solid border-black p-5 text-justify text-sm font-light sm:w-[80%] md:w-[50%] md:text-lg lg:w-[50%]">
				<p className="">
					I am a software developer and musician with a passion for exploring the
					intersections between tech and the arts, helping creative professionals advance
					their skills and careers. As a web developer proficient in React, Typescript,
					and Python, I craft seamless user experiences through robust and reliable
					functionality alongside intuitive, responsive, and beautiful UI. <br></br>
				</p>
				<p className="">
					My expertise extends to backend and API development, granting me a holistic
					understanding of the applications to which I contribute. Beyond my numerous
					personal projects, I have collaborated with diverse teams and clients on both
					freelance and volunteer work, consistently delivering exceptional user
					experiences. With every application that I build, I strive to write clean,
					maintainable code while drawing from a rich palette of knowledge acquired
					through my dual roles as a developer and creative professional.
				</p>
			</div>
		</div>
	);
};

export default Bio;
