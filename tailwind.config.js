/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'paper-white': '#fffdf5',
				'black-trans': 'rgba(0,0,0,0.15)',
				'black-trans-1': 'rgba(0,0,0,0.75)',
				'paper-white-trans-0': 'rgba(255,253,245,0.75)',
				'paper-grey': '#e5e1d8',
			},
			backgroundImage: {
				imageIcon: 'url("/imageIcon.svg")',
			},
			animation: {
				'scroll-music': 'scroll-music 17s infinite linear',
				'wave-github': 'wave-github 1s infinite linear alternate',
				'fade-in-portfolio': 'fade-in-portfolio 0.5s ease-in-out',
				'fade-in-portfolio-desktop': 'fade-in-portfolio-desktop 1s ease-in-out',
				'animate-button-click-1': 'animate-button-click-1 2s ease-out',
			},
			keyframes: {
				'scroll-music': {
					'0%': { opacity: '0%', transform: 'translate(260px) scale(210%)' },
					'5%': { opacity: '100%' },
					'95%': { opacity: '100%' },
					'100%': { opacity: '0%', transform: 'translate(-250px) scale(210%)' },
				},
				'wave-github': {
					'0%': { rotate: '0deg' },
					'100%': { rotate: '8deg' },
				},
				'fade-in-portfolio': {
					'0%': { opacity: '0%', transform: 'translateY(-25%)' },
					'100%': { opacity: '100%', transform: 'translateY(0%)' },
				},
				'fade-in-portfolio-desktop': {
					'0%': { opacity: '0%' },
					'100%': { opacity: '100%' },
				},
				'animate-button-click-1': {
					'0%': { opacity: '1', transform: 'translateY(0px) translateX(0px)' },
					'15%': { opacity: '1', transform: 'translateY(500px) translateX(500px)' },
					'100%': { opacity: '0', transform: 'translateY(-500px)' },
				},
			},
		},
	},
	plugins: [],
};
