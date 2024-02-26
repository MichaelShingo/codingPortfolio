import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
	value: LocationState;
};

export type Coordinate = {
	x: number;
	y: number;
};

const nullFunction = (): void => {
	console.log('null');
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
	scrollToBio: () => void;
	scrollToPortfolio: () => void;
	scrollToContact: () => void;
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
		scrollToBio: nullFunction,
		scrollToPortfolio: nullFunction,
		scrollToContact: nullFunction,
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
		setScrollToContact: (state, action: PayloadAction<() => void>) => {
			state.value.scrollToContact = action.payload;
		},
		setScrollToPortfolio: (state, action: PayloadAction<() => void>) => {
			state.value.scrollToPortfolio = action.payload;
		},
		setScrollToBio: (state, action: PayloadAction<() => void>) => {
			state.value.scrollToBio = action.payload;
		},
	},
});

export const {
	setPage,
	setBoundingBox,
	setContactBoundingBox,
	setScrollToContact,
	setScrollToPortfolio,
	setScrollToBio,
} = location.actions;
export default location.reducer;
