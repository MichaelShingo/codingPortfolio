'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const TypedText = () => {
	const [text1, setText1] = useState<string>('');
	const [text2, setText2] = useState<string>('');
	const [text3, setText3] = useState<string>('');
	const [text4, setText4] = useState<string>('');
	const [text5, setText5] = useState<string>('');
	const [line1, setLine1] = useState<boolean>(true);
	const [line2, setLine2] = useState<boolean>(false);
	const [line3, setLine3] = useState<boolean>(false);
	const [line4, setLine4] = useState<boolean>(false);
	const [line5, setLine5] = useState<boolean>(false);

	useEffect(() => {
		const textList: string[] = [
			'const data = {',
			`occupations: [‘Software Developer’, 'Musician'],`,
			`specializations: [‘frontend web dev', ‘audio apps’],`,
			`location: ‘Rotterdam, the Netherlands’,`,
			`};`,
		];

		const textStateSettersList: Dispatch<SetStateAction<string>>[] = [
			setText1,
			setText2,
			setText3,
			setText4,
			setText5,
		];

		const lineSettersList: Dispatch<SetStateAction<boolean>>[] = [
			setLine1,
			setLine2,
			setLine3,
			setLine4,
			setLine5,
		];

		const typingSpeed: number = 50;

		const typeText = (
			text: string,
			j: number = 0,
			setTextFunction: Dispatch<SetStateAction<string>>
		) => {
			if (j === text.length + 1) {
				return;
			}
			setTimeout(() => {
				setTextFunction(text.substring(0, j));
				typeText(text, j + 1, setTextFunction);
			}, typingSpeed);
		};

		const delayedLoop = (iterations: number) => {
			let i: number = 0;

			const loopIteration = () => {
				if (i < iterations) {
					lineSettersList[i](true);
					const delay: number = typingSpeed * textList[i].length + 500;
					typeText(textList[i], 0, textStateSettersList[i]);
					i++;
					setTimeout(loopIteration, delay);
				}
			};
			loopIteration();
		};

		delayedLoop(textList.length);
	}, []);

	const isLineNumberVisible = (stateToCheck: boolean) => {
		return stateToCheck ? 'bg-text-gray-400' : 'text-paper-white dark:text-black';
	};

	return (
		<div className="h-2/8 sm:text-md flex w-fit min-w-[350px] flex-row text-sm leading-[10.7px] md:text-2xl md:leading-[18px] lg:text-2xl lg:leading-[18px] dark:text-white">
			<div className="mr-4 text-right text-gray-400 [&>*]:transition duration-400">
				<h5 className={isLineNumberVisible(line1)}>1</h5>
				<br></br>
				<h5 className={isLineNumberVisible(line2)}>2</h5>
				<br></br>
				<h5 className={isLineNumberVisible(line3)}>3</h5>
				<br></br>
				<h5 className={isLineNumberVisible(line4)}>4</h5>
				<br></br>
				<h5 className={isLineNumberVisible(line5)}>5</h5>
			</div>
			<div className="text-left">
				<h5>{text1}</h5>
				<br></br>
				<h5 className="pl-[35px]">{text2}</h5>
				<br></br>
				<h5 className="pl-[35px]">{text3}</h5>
				<br></br>
				<h5 className="pl-[35px]">{text4}</h5>
				<br></br>
				<h5>{text5}</h5>
			</div>
		</div>
	);
};

export default TypedText;
