import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
	value: LocationState;
};

export type Coordinate = {
	x: number;
	y: number;
};

export type BoundingBox = {
	topLeft: Coordinate;
	topRight: Coordinate;
	bottomRight: Coordinate;
	bottomLeft: Coordinate;
};

type LocationState = {
	page: string;
	boundingBox: BoundingBox;
};

const initialState = {
	value: {
		page: 'Bio',
		boundingBox: {
			topLeft: { x: 0, y: 0 },
			topRight: { x: 0, y: 0 },
			bottomRight: { x: 0, y: 0 },
			bottomLeft: { x: 0, y: 0 },
		},
	} as LocationState,
} as InitialState;

export const location = createSlice({
	name: 'location',
	initialState: initialState,
	reducers: {
		setPage: (state, action: PayloadAction<string>) => {
			state.value.page = action.payload;
		},
		setBoundingBox: (state, action: PayloadAction<BoundingBox>) => {
			state.value.boundingBox = action.payload;
		},
	},
});

export const { setPage, setBoundingBox } = location.actions;
export default location.reducer;
