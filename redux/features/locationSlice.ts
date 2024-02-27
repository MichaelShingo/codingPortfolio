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
	contactFieldBoundingBox: BoundingBox;
};

const boundingBoxInitialState: BoundingBox = {
	topLeft: { x: 0, y: 0 },
	topRight: { x: 0, y: 0 },
	bottomRight: { x: 0, y: 0 },
	bottomLeft: { x: 0, y: 0 },
};

const initialState = {
	value: {
		page: 'Bio',
		boundingBox: boundingBoxInitialState,
		contactFieldBoundingBox: boundingBoxInitialState,
	} as LocationState,
} as InitialState;

export const boundingClientRectToBoundingBox = (rect: DOMRect): BoundingBox => {
	return {
		topLeft: { x: rect.left, y: rect.top },
		topRight: { x: rect.right, y: rect.top },
		bottomRight: { x: rect.right, y: rect.bottom },
		bottomLeft: { x: rect.left, y: rect.bottom },
	};
};

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
		setContactBoundingBox: (state, action: PayloadAction<BoundingBox>) => {
			state.value.contactFieldBoundingBox = action.payload;
		},
	},
});

export const { setPage, setBoundingBox, setContactBoundingBox } = location.actions;
export default location.reducer;
