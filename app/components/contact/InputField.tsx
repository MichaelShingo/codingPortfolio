import {
	BoundingBox,
	boundingClientRectToBoundingBox,
	setContactBoundingBox,
} from '@/redux/features/locationSlice';
import React, { Dispatch, ReactNode, SetStateAction, useRef } from 'react';
import { useDispatch } from 'react-redux';
interface InputFieldProps {
	type: string;
	label: string;
	clef: ReactNode;
	val: string;
	setVal: Dispatch<SetStateAction<string>>;
	handleBlur: () => void;
}
export const inputFieldClasses: string = `w-[65vw] max-w-[575px] rounded-md focus:rounded-xs bg-paper-grey dark:bg-paper-grey-dark font-thin text-base p-2 peer transition duration-700 origin-top-right `;
export const labelClasses: string =
	'mt-5 text-xl 2xl:text-2xl font-light text-left w-[65%] max-w-[575px]';
export const clefContainerClasses: string =
	'absolute aspect-square h-[70px] translate-x-[-75%] translate-y-[-30%] transition duration-700 peer-focus:translate-x-[-90%] 2xl:peer-focus:translate-x-[-95%] sm:translate-x-[-80%] sm:scale-[110%] 2xl:scale-[125%] ';

const InputField: React.FC<InputFieldProps> = ({
	type,
	label,
	clef,
	val,
	setVal,
	handleBlur,
}) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLInputElement | null>(null);

	const handleFocus = () => {
		if (ref.current) {
			const clientBoundingBox: DOMRect = ref.current.getBoundingClientRect();
			const boundingBox: BoundingBox = boundingClientRectToBoundingBox(clientBoundingBox);
			dispatch(setContactBoundingBox(boundingBox));
		}
	};

	return (
		<div className="group flex w-[100%] flex-col items-center justify-center dark:text-white">
			<h3 className={labelClasses}>{label}</h3>
			<div className="flex flex-row">
				<input
					onBlur={handleBlur}
					value={val}
					onChange={(e) => setVal(e.target.value)}
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

export default InputField;
