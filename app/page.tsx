import Bio from './components/bio/Bio';
import WindowEvents from './components/eventHandlers/windowEvents';
import Intro from './components/intro/Intro';
import Navbar from './components/navbar/Navbar';
import SelectionRect from './components/selectionRect/SelectionRect';

export default function Home() {
	return (
		<>
			<SelectionRect />
			<Intro />
			<Navbar />
			<Bio />
			<WindowEvents />
		</>
	);
}
