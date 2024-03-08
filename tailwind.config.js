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
				'main-button-click-0': 'main-button-click-0 1.2s ease-out',
				'main-button-click-1': 'main-button-click-1 1.7s ease-out',
				'main-button-click-2': 'main-button-click-2 0.8s ease-out',
				'main-button-click-3': 'main-button-click-3 1s ease-out',
				'main-button-click-4': 'main-button-click-4 1.4s ease-out',
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
				'main-button-click-0': {
					'0%': {
						opacity: '1',
						transform: 'translateX(120px) translateY(0px) rotate(0deg)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(250px) translateY(-15px) rotate(625deg) ',
					},
				},
				'main-button-click-1': {
					'0%': {
						opacity: '1',
						transform: 'translateX(-100px) translateY(0px) rotate(0deg)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(-275px) translateY(-200px) rotate(325deg) ',
					},
				},
				'main-button-click-2': {
					'0%': {
						opacity: '1',
						transform: 'translateX(-100px) translateY(0px) rotate(0deg)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(-220px) translateY(-10px) rotate(425deg) ',
					},
				},
				'main-button-click-3': {
					'0%': {
						opacity: '1',
						transform: 'translateX(-50px) translateY(0px) rotate(0deg)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(-100px) translateY(-150px) rotate(525deg) ',
					},
				},
				'main-button-click-4': {
					'0%': {
						opacity: '1',
						transform: 'translateX(0px) translateY(0px) rotate(0deg)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateX(100px) translateY(-175px) rotate(1000deg) ',
					},
				},
			},
		},
	},
	plugins: [],
};
