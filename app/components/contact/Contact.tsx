'use client';
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import AltoClef from './AltoClef';
import BassClef from './BassClef';
import TrebleClef from './TrebleClef';
import MainButton from '../intro/MainButton';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
	BoundingBox,
	boundingClientRectToBoundingBox,
	setContactBoundingBox,
	setContactDimensions,
} from '@/redux/features/locationSlice';
import SelectionRect from '../selectionRect/SelectionRect';
import { actions, useAppState } from '../../context/AppStateContext';
import { sendContactForm } from '@/app/utils/email';

interface InputFieldProps {
	type: string;
	label: string;
	clef: ReactNode;
	val: string;
	setVal: Dispatch<SetStateAction<string>>;
	handleBlur: () => void;
}
const inputFieldClasses: string = `w-[65vw] max-w-[575px] rounded-md focus:rounded-xs bg-paper-grey font-thin text-base p-2 peer transition duration-700 origin-top-right `;
const labelClasses: string =
	'mt-5 text-xl 2xl:text-2xl font-light text-left w-[65%] max-w-[575px]';
const clefContainerClasses: string =
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
		<div className="group flex w-[100%] flex-col items-center justify-center">
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

type BlurredFields = {
	name: boolean;
	email: boolean;
	message: boolean;
};

const Contact: React.FC = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [status, setStatus] = useState<boolean | null>(null);
	const [isBlurred, setIsBlurred] = useState<BlurredFields>({
		name: false,
		email: false,
		message: false,
	});

	const isEmailValid = (email: string): boolean => {
		const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const getErrorMessage = (name: string, email: string, message: string): string => {
		let res: string = 'Please enter ';
		const errorList: string[] = [];
		if (name === '' && isBlurred.name) {
			errorList.push('your name');
		}
		if (!isEmailValid(email) && isBlurred.email) {
			errorList.push('a valid email');
		}
		if (message === '' && isBlurred.message) {
			errorList.push('a message');
		}

		if (errorList.length === 0) {
			return '';
		}
		if (errorList.length === 1) {
			res += errorList[0];
		} else {
			for (let i = 0; i < errorList.length; i++) {
				if (i === errorList.length - 1) {
					res += 'and ' + errorList[i];
				} else {
					res += errorList[i] + ', ';
				}
			}
		}
		if (errorList.length === 2) {
			res = res.replace(',', '');
		}
		return res + '.';
	};

	const { dispatchContext } = useAppState();
	const contactSectionRef = useRef<HTMLElement | null>(null);
	const windowHeight: number = useAppSelector(
		(state) => state.windowReducer.value.windowHeight
	);
	const windowWidth: number = useAppSelector(
		(state) => state.windowReducer.value.windowWidth
	);

	const scrollToSection = () => {
		setTimeout(() => {
			contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 200);
	};

	useEffect(() => {
		if (contactSectionRef.current) {
			dispatchContext({ type: actions.SET_SCROLL_TO_CONTACT, payload: scrollToSection });
		}
	}, [contactSectionRef]);

	useEffect(() => {
		if (contactSectionRef.current) {
			const sectionBoundingBox: DOMRect =
				contactSectionRef.current.getBoundingClientRect();
			setTimeout(() => {
				dispatch(
					setContactDimensions(boundingClientRectToBoundingBox(sectionBoundingBox))
				);
			});
		}
	}, [windowHeight, windowWidth]);

	const contactBoundingBox: BoundingBox = useAppSelector(
		(state) => state.locationReducer.value.contactFieldBoundingBox
	);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): Promise<void> => {
		e.preventDefault();
		const status: number = await sendContactForm({
			name: name,
			email: email,
			message: message,
		});
		if (status === 200) {
			setStatus(true);
			setMessage('');
			setEmail('');
			setName('');
			setTimeout(() => {
				setStatus(null);
			}, 2500);
		} else {
			setStatus(false);
			setTimeout(() => {
				setStatus(null);
			}, 2500);
		}
	};

	const getButtonLabel = (): string => {
		if (status === null) {
			return 'submit';
		} else if (status === true) {
			return 'message sent';
		} else {
			return 'send failed';
		}
	};

	return (
		<section
			ref={contactSectionRef}
			id="contact"
			className="flex h-screen w-screen flex-col items-center justify-between pt-32 2xl:pt-44"
		>
			<SelectionRect boundingBox={contactBoundingBox} />
			<div className="flex h-fit w-[100%] flex-col justify-center">
				<InputField
					val={name}
					setVal={setName}
					type="text"
					label="Name*"
					clef={<TrebleClef />}
					handleBlur={() => setIsBlurred((prev) => ({ ...prev, name: true }))}
				/>
				<InputField
					val={email}
					setVal={setEmail}
					type="email"
					label="Email*"
					clef={<AltoClef />}
					handleBlur={() => setIsBlurred((prev) => ({ ...prev, email: true }))}
				/>
				<div className="flex w-[100%] flex-col items-center justify-center">
					<h3 className={labelClasses}>Message*</h3>
					<div className="flex flex-row">
						<textarea
							value={message}
							onBlur={() => setIsBlurred((prev) => ({ ...prev, message: true }))}
							onChange={(e) => setMessage(e.target.value)}
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
				<p className="mt-3 h-5 min-h-1 w-full text-center">
					{getErrorMessage(name, email, message)}
				</p>
				<div className="flex h-[120px] w-[100%] scale-[70%] flex-row items-center justify-center overflow-x-hidden sm:scale-[80%]">
					<MainButton onClick={(e) => handleSubmit(e)} label={getButtonLabel()} />
				</div>
			</div>
			<div className="pb-3 text-center text-sm font-thin md:text-base">
				<div className="mb-[2vh] flex h-[5vh] w-screen flex-row justify-center space-x-7">
					<a
						className="aspect-square h-[100%]"
						href="https://github.com/MichaelShingo"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/github.svg" />
					</a>
					<a
						className="aspect-square h-[100%]"
						href="https://www.linkedin.com/in/software-engineer-shingo/"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/linkedin.svg" />
					</a>
					<a
						className="aspect-square h-[100%]"
						href="https://www.youtube.com/channel/UCb46nljnneXaQCa5wKYsbWA"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/youtube.svg" />
					</a>
				</div>
				<p>Copyright © {new Date().getFullYear()} Michael Shingo Crawford</p>
				<p>
					Built with <strong>Next.js | Typescript | Tailwind CSS | Redux</strong>
					<a
						href="https://github.com/MichaelShingo/codingPortfolio"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/github.svg" className="mb-1 ml-1 inline h-5 cursor-pointer" />
					</a>
				</p>
			</div>
		</section>
	);
};

export default Contact;
