import Bio from './components/bio/Bio';
import Contact from './components/contact/Contact';
import WindowEvents from './components/eventHandlers/windowEvents';
import Intro from './components/intro/Intro';
import Navbar from './components/navbar/Navbar';
import Portfolio from './components/portfolio/Portfolio';
import NavbarSelectionContainer from './components/selectionRect/NavbarSelectionContainer';
import AppStateProvider from './context/AppStateContext';

export default function Home() {
	return (
		<div className="">
			<AppStateProvider>
				<NavbarSelectionContainer />
				<Intro />
				<Navbar />
				<Bio />
				<Portfolio />
				<Contact />
				<WindowEvents />
			</AppStateProvider>
		</div>
	);
}
