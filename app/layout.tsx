import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const oswald = Oswald({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Michael Shingo Crawford | Software Developer',
	description:
		'Michael Shingo Crawford, web developer and musician based in the Netherlands. Build with Next.js, React, Typescript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="overflow-x-hidden bg-paper-white">
			<body className={`${oswald.className}`}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
