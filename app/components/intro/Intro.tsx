import MainButton from './MainButton';
import TypedText from './TypedText';

const Intro = () => {
	return (
		<div className="scroll flex h-screen flex-col items-center justify-evenly space-y-10 overflow-x-hidden">
			<div className="h-2/8 w-screen"></div>
			<h1 className="h-2/8 text-center text-6xl font-light">Michael Shingo Crawford</h1>
			<TypedText />
			<div className="h-2/8 flex h-[200px] w-screen flex-row items-center justify-center overflow-x-hidden">
				<MainButton />
			</div>
		</div>
	);
};

export default Intro;
