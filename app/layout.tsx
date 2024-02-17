import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const oswald = Oswald({
	subsets: ['latin'],
	display: 'swap',
});
export const metadata: Metadata = {
	title: 'Portfolio | Michael Shingo Crawford',
	description:
		'Web development portfolio for Michael Shingo Crawford. Built with Next.js, Typescript, Tailwind CSS, and Redux.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="bg-paper-white overflow-hidden selection:bg-black selection:text-paper-white"
		>
			<body className={oswald.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
