export type PortfolioItem = {
	title: string;
	preview: string;
	tags: string[];
	logo: string;
	showcase: boolean;
	description: string;
	github: string;
	link: string;
	images: string[];
};

export const sampleJSON: PortfolioItem[] = [
	{
		title: 'Miitronome',
		preview: 'A metronome with support for polyrhythms, subdivisions, and more.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
		description:
			'Miitronome is a progressive web application which can be used online or installed on iOS or Android. The Metronome has robust features, including support for polyrhythms, subdivisions, and sound customization. This application is built with Next.js, React.js, Typescript, and Material UI. Miitronome is a progressive web application which can be used online or installed on iOS or Android. The Metronome has robust features, including support for polyrhythms, subdivisions, and sound customization. This application is built with Next.js, React.js, Typescript, and Material UI.',
		github: '',
		link: 'https://metronome.michaelshingo.com',
		images: [
			'/miitronome/appMain.jpg',
			'/miitronome/code.jpg',
			'/miitronome/crazy-polyrhythm.jpg',
			'/miitronome/overview.jpg',
			'/miitronome/settings.jpg',
			'/miitronome/settingsDesktop.jpg',
		],
	},
	{
		title: 'Violintice',
		preview: 'A violin etude database and practice tracker.',
		tags: ['React', 'Django', 'PostgreSQL'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
		description: `This application offers violinists a database of standard etudes that allows them to track their progress. Based on user-inputted data, the app provides data-insights that may guide the musician's practice.`,
		github: 'https://github.com/MichaelShingo/practiceApp',
		link: 'https://violintice.michaelshingo.com',
		images: [
			'/violintice/violintice01.jpg',
			'/violintice/violintice02.jpg',
			'/violintice/violintice03.jpg',
			'/violintice/violintice04.jpg',
			'/violintice/violintice05.jpg',
			'/violintice/violintice06.jpg',
			'/violintice/violintice07.jpg',
		],
	},
	{
		title: 'For the Lost Creative',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
		description:
			'Miitronome is a progressive web application which can be used online or installed on iOS or Android. The Metronome has robust features, including support for polyrhythms, subdivisions, and sound customization. This application is built with Next.js, React.js, Typescript, and Material UI.',
		github: '',
		link: '',
		images: [
			'/miitronome/appMain.jpg',
			'/miitronome/code.jpg',
			'/miitronome/crazy-polyrhythm.jpg',
			'/miitronome/overview.jpg',
			'/miitronome/settings.jpg',
			'/miitronome/settingsDesktop.jpg',
		],
	},
	{
		title: 'AnnaLyze',
		preview: 'Miitronome is a metronome app build with Typescript.',
		tags: ['Next.js', 'Typescript', 'MUI'],
		logo: '/miitronomeLogoPortfolio.svg',
		showcase: true,
		description:
			'Miitronome is a progressive web application which can be used online or installed on iOS or Android. The Metronome has robust features, including support for polyrhythms, subdivisions, and sound customization. This application is built with Next.js, React.js, Typescript, and Material UI.',
		github: '',
		link: '',
		images: [
			'/miitronome/appMain.jpg',
			'/miitronome/code.jpg',
			'/miitronome/crazy-polyrhythm.jpg',
			'/miitronome/overview.jpg',
			'/miitronome/settings.jpg',
			'/miitronome/settingsDesktop.jpg',
		],
	},
];
