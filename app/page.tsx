import Bio from './components/bio/Bio';
import Contact from './components/contact/Contact';
import WindowEvents from './components/eventHandlers/windowEvents';
import Intro from './components/intro/Intro';
import Navbar from './components/navbar/Navbar';
import Portfolio from './components/portfolio/Portfolio';
import ContactSelectionContainer from './components/selectionRect/ContactSelectionContainer copy';
import NavbarSelectionContainer from './components/selectionRect/NavbarSelectionContainer';

export default function Home() {
	return (
		<div className="">
			<NavbarSelectionContainer />
			{/* <ContactSelectionContainer /> */}
			<Intro />
			<Navbar />
			<Bio />
			<Portfolio />
			<Contact />
			<WindowEvents />
		</div>
	);
}
