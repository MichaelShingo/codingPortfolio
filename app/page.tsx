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
import DarkModeToggle from './components/darkMode/DarkModeToggle';
import { useDispatch } from 'react-redux';
import { setIsCursorInWindow } from '@/redux/features/windowSlice';
import Inverter from './components/darkMode/Inverter';

export default function Home() {
	const isDarkMode: boolean = useAppSelector(
		(state) => state.locationReducer.value.isDarkMode
	);

	const dispatch = useDispatch();

	return (
		<div
			onMouseEnter={() => dispatch(setIsCursorInWindow(true))}
			onMouseLeave={() => dispatch(setIsCursorInWindow(false))}
			className={`${
				isDarkMode ? 'dark' : ''
			} h-[100vh] bg-paper-white dark:bg-black transition selection:bg-black selection:text-paper-white dark:selection:bg-paper-white dark:selection:text-black`}
		>
			<AppStateProvider>
				<Inverter />
				<NavbarSelectionContainer />
				<Intro />
				<Gallery />
				<PortfolioDetail />
				<Navbar />
				<Bio />
				<Portfolio />
				<Contact />
				<DarkModeToggle />
				<WindowEvents />
				<ScrollEvents />
			</AppStateProvider>
		</div>
	);
}
