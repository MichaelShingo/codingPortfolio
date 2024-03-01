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
			},
		},
	},
	plugins: [],
};
