import Bio from './components/bio/Bio';
import Intro from './components/intro/Intro';
import Navbar from './components/navbar/Navbar';

export default function Home() {
	return (
		<>
			<Intro />
			<Navbar />
			<Bio />
		</>
	);
}
