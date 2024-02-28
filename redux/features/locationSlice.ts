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

const boundingBoxInitialState: BoundingBox = {
	topLeft: { x: 0, y: 0 },
	topRight: { x: 0, y: 0 },
	bottomRight: { x: 0, y: 0 },
	bottomLeft: { x: 0, y: 0 },
};

export const boundingClientRectToBoundingBox = (rect: DOMRect): BoundingBox => {
	return {
		topLeft: { x: rect.left, y: rect.top },
		topRight: { x: rect.right, y: rect.top },
		bottomRight: { x: rect.right, y: rect.bottom },
		bottomLeft: { x: rect.left, y: rect.bottom },
	};
};

type LocationState = {
	page: string;
	boundingBox: BoundingBox;
	contactFieldBoundingBox: BoundingBox;
	isVisibleBio: boolean;
	isVisiblePortfolio: boolean;
	isVisibleContact: boolean;
	bioDimensions: BoundingBox;
	portfolioDimensions: BoundingBox;
	contactDimensions: BoundingBox;
};

const initialState = {
	value: {
		page: 'Bio',
		boundingBox: boundingBoxInitialState,
		contactFieldBoundingBox: boundingBoxInitialState,
		isVisibleBio: true,
		isVisiblePortfolio: false,
		isVisibleContact: false,
		bioDimensions: boundingBoxInitialState,
		portfolioDimensions: boundingBoxInitialState,
		contactDimensions: boundingBoxInitialState,
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
		setContactBoundingBox: (state, action: PayloadAction<BoundingBox>) => {
			state.value.contactFieldBoundingBox = action.payload;
		},
		setBioDimensions: (state, action: PayloadAction<BoundingBox>) => {
			state.value.bioDimensions = action.payload;
		},
		setPortfolioDimensions: (state, action: PayloadAction<BoundingBox>) => {
			state.value.portfolioDimensions = action.payload;
		},
		setContactDimensions: (state, action: PayloadAction<BoundingBox>) => {
			state.value.contactDimensions = action.payload;
		},
		setIsVisibleBio: (state, action: PayloadAction<boolean>) => {
			state.value.isVisibleBio = action.payload;
			state.value.isVisiblePortfolio = false;
			state.value.isVisibleContact = false;
			state.value.page = 'Bio';
		},
		setIsVisiblePortfolio: (state, action: PayloadAction<boolean>) => {
			state.value.isVisiblePortfolio = action.payload;
			state.value.isVisibleContact = false;
			state.value.isVisibleBio = false;
			state.value.page = 'Portfolio';
		},
		setIsVisibleContact: (state, action: PayloadAction<boolean>) => {
			state.value.isVisibleContact = action.payload;
			state.value.isVisibleBio = false;
			state.value.isVisiblePortfolio = false;
			state.value.page = 'Contact';
		},
	},
});

export const {
	setPage,
	setBoundingBox,
	setContactBoundingBox,
	setIsVisibleBio,
	setIsVisibleContact,
	setIsVisiblePortfolio,
	setBioDimensions,
	setPortfolioDimensions,
	setContactDimensions,
} = location.actions;
export default location.reducer;
