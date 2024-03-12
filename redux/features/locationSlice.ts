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
	isIntroOpen: boolean;
	page: string;
	boundingBox: BoundingBox;
	contactFieldBoundingBox: BoundingBox;
	bioDimensions: BoundingBox;
	portfolioDimensions: BoundingBox;
	contactDimensions: BoundingBox;
	scrollY: number;
	selectedPortfolioId: number;
	isPortfolioDetailOpen: boolean;
	isGalleryOpen: boolean;
	isDarkMode: boolean;
};

const initialState = {
	value: {
		isIntroOpen: true,
		page: 'Bio',
		boundingBox: boundingBoxInitialState,
		contactFieldBoundingBox: boundingBoxInitialState,
		bioDimensions: boundingBoxInitialState,
		portfolioDimensions: boundingBoxInitialState,
		contactDimensions: boundingBoxInitialState,
		scrollY: 0,
		selectedPortfolioId: 0,
		isPortfolioDetailOpen: false,
		isGalleryOpen: false,
		isDarkMode: false,
	} as LocationState,
} as InitialState;

export const location = createSlice({
	name: 'location',
	initialState: initialState,
	reducers: {
		setIsIntroOpen: (state, action: PayloadAction<boolean>) => {
			state.value.isIntroOpen = action.payload;
		},
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
			action.payload.bottomLeft.y += state.value.scrollY;
			state.value.bioDimensions = action.payload;
		},
		setPortfolioDimensions: (state, action: PayloadAction<BoundingBox>) => {
			action.payload.bottomLeft.y += state.value.scrollY;
			state.value.portfolioDimensions = action.payload;
		},
		setContactDimensions: (state, action: PayloadAction<BoundingBox>) => {
			action.payload.bottomLeft.y += state.value.scrollY;
			state.value.contactDimensions = action.payload;
		},
		setScrollY: (state, action: PayloadAction<number>) => {
			state.value.scrollY = action.payload;
		},
		setSelectedPortfolioId: (state, action: PayloadAction<number>) => {
			state.value.selectedPortfolioId = action.payload;
		},
		setIsPortfolioDetailOpen: (state, action: PayloadAction<boolean>) => {
			state.value.isPortfolioDetailOpen = action.payload;
		},
		setIsGalleryOpen: (state, action: PayloadAction<boolean>) => {
			state.value.isGalleryOpen = action.payload;
		},
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.value.isDarkMode = action.payload;
		},
	},
});

export const {
	setIsIntroOpen,
	setPage,
	setBoundingBox,
	setContactBoundingBox,
	setBioDimensions,
	setPortfolioDimensions,
	setContactDimensions,
	setScrollY,
	setSelectedPortfolioId,
	setIsPortfolioDetailOpen,
	setIsGalleryOpen,
	setIsDarkMode,
} = location.actions;
export default location.reducer;
