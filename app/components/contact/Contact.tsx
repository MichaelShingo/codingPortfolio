'use client';
import React, { ReactNode, useRef } from 'react';
import AltoClef from './AltoClef';
import BassClef from './BassClef';
import TrebleClef from './TrebleClef';
import MainButton from '../intro/MainButton';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
	BoundingBox,
	boundingClientRectToBoundingBox,
	setContactBoundingBox,
} from '@/redux/features/locationSlice';
import SelectionRect from '../selectionRect/SelectionRect';

interface InputFieldProps {
	type: string;
	label: string;
	clef: ReactNode;
}
const inputFieldClasses: string = `w-[65vw] max-w-[575px] rounded-md focus:rounded-xs bg-paper-grey font-thin text-base p-2 peer transition duration-700 origin-top-right `;
const labelClasses: string =
	'mt-5 text-xl 2xl:text-2xl font-light text-left w-[65%] max-w-[575px]';
const clefContainerClasses: string =
	'absolute aspect-square h-[70px] translate-x-[-75%] translate-y-[-30%] transition duration-700 peer-focus:translate-x-[-90%] 2xl:peer-focus:translate-x-[-95%] sm:translate-x-[-80%] sm:scale-[110%] 2xl:scale-[125%] ';

const InputField: React.FC<InputFieldProps> = ({ type, label, clef }) => {
	const dispatch = useDispatch<AppDispatch>();

	const ref = useRef<HTMLInputElement | null>(null);

	const handleFocus = () => {
		if (ref.current) {
			const clientBoundingBox: DOMRect = ref.current.getBoundingClientRect();
			const boundingBox: BoundingBox = boundingClientRectToBoundingBox(clientBoundingBox);
			dispatch(setContactBoundingBox(boundingBox));
		}
	};

	return (
		<div className="group flex w-[100%] flex-col items-center justify-center">
			<h3 className={labelClasses}>{label}</h3>
			<div className="flex flex-row">
				<input
					ref={ref}
					onFocus={handleFocus}
					type={type}
					className={inputFieldClasses + ' h-[35px] sm:h-[40px] 2xl:h-[45px]'}
				/>
				<div className={clefContainerClasses}>{clef}</div>
			</div>
		</div>
	);
};

const Contact: React.FC = () => {
	const contactBoundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.contactFieldBoundingBox
	);

	const handleSubmit = () => {
		console.log('submit');
	};

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	return (
		<div className="flex h-[100vh] w-screen flex-col items-center justify-between pt-32 2xl:pt-44">
			<SelectionRect boundingBox={contactBoundingBox} />
			<div className="flex h-fit w-[100%] flex-col justify-center">
				<InputField type="text" label="Name" clef={<TrebleClef />} />
				<InputField type="email" label="Email" clef={<AltoClef />} />
				<div className="flex w-[100%] flex-col items-center justify-center">
					<h3 className={labelClasses}>Message</h3>
					<div className="flex flex-row">
						<textarea
							cols={50}
							className={
								inputFieldClasses + ' h-[100px] sm:h-[140px] 2xl:h-[170px] resize-none'
							}
						/>
						<div className={clefContainerClasses}>
							<BassClef />
						</div>
					</div>
				</div>
				<div className="flex h-[200px] w-[100%] scale-[70%] flex-row items-center justify-center overflow-x-hidden sm:scale-[80%]">
					<MainButton onClick={handleSubmit} label="submit" />
				</div>
			</div>
			<div className="pb-3 text-center text-sm font-thin">
				<p>Copyright © {currentYear} Michael Shingo Crawford</p>
				<p>
					Built with <strong>Next.js | Typescript | Tailwind CSS | Redux</strong>
				</p>
			</div>
		</div>
	);
};

export default Contact;
