'use client';
import { useAppSelector } from '@/redux/store';
import Bio from './components/bio/Bio';
import Contact from './components/contact/Contact';
import ScrollEvents from './components/eventHandlers/scrollEvents';
import WindowEvents from './components/eventHandlers/windowEvents';
import Intro from './components/intro/Intro';
import Navbar from './components/navbar/Navbar';
import Gallery from './components/portfolio/Gallery';
import Portfolio from './components/portfolio/Portfolio';
import PortfolioDetail from './components/portfolio/PortfolioDetail';
import NavbarSelectionContainer from './components/selectionRect/NavbarSelectionContainer';
import AppStateProvider from './context/AppStateContext';

export default function Home() {
	const isScrollDisabled: boolean = useAppSelector(
		(state) =>
			state.locationReducer.value.isPortfolioDetailOpen ||
			state.locationReducer.value.isIntroOpen
	);

	return (
		<div className="h-[100vh]">
			<AppStateProvider>
				<NavbarSelectionContainer />
				<Intro />
				<Gallery />
				<PortfolioDetail />
				<Navbar />
				<Bio />
				<Portfolio />
				<Contact />
				<WindowEvents />
				<ScrollEvents />
			</AppStateProvider>
		</div>
	);
}
