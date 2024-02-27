'use client';
import React, { createContext, useReducer, useContext, Dispatch } from 'react';

type VoidFunction = () => void;

interface GlobalState {
	scrollToContact: VoidFunction;
}

const nullFunction = (): void => {
	console.log('null');
};

const initialState: GlobalState = {
	scrollToContact: nullFunction,
};

export type AppAction = { type: string; payload?: string | number | VoidFunction };

interface AppStateContextType {
	state: GlobalState;
	dispatch: Dispatch<AppAction>;
}

export const actions: Record<string, string> = {
	SET_SCROLL_TO_CONTACT: 'SCROLL_TO_CONTACT',
};

const appReducer = (state: GlobalState, action: AppAction): GlobalState => {
	switch (action.type) {
		case actions.TOGGLE_TEMPO_DIALOG:
			return { ...state, scrollToContact: action.payload as VoidFunction };

		default:
			return state;
	}
};

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

interface Props {
	children: React.ReactNode;
}

const AppStateProvider: React.FC<Props> = ({ children }) => {
	// useReducer returns the current state and a dispatch function
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = (): AppStateContextType => {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider');
	}
	return context;
};

export default AppStateProvider;
