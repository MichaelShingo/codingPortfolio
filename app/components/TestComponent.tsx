'use client';
import '../globals.css';
import { logOut, logIn } from '@/redux/features/authSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const TestComponent = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [username, setUsername] = useState<string>('');

	const loggedInUser = useAppSelector((state) => state.authReducer.value.username);
	const login = () => {
		dispatch(logIn(username));
	};

	return (
		<>
			<h1>Logged in User: {loggedInUser}</h1>
			<input type="text" onChange={(e) => setUsername(e.target.value)}></input>;
			<button onClick={login}>submit</button>
		</>
	);
};

export default TestComponent;
