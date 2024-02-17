import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { dragEndReducer } from './reducers/dragEnd';
import { moveBelowReducer } from './reducers/move.Below';

const initialState: {
	board: string[];
	boardSize: number;
	squareBeingReplaced: Element | undefined;
	squareBeingDragged: Element | undefined;
} = {
	board: [],
	boardSize: 8,
	squareBeingDragged: undefined,
	squareBeingReplaced: undefined,
};

const crushCandySlice = createSlice({
	name: 'crushCandy',
	initialState,
	reducers: {
		updateBoard: (state, action: PayloadAction<string[]>) => {
			state.board = action.payload;
		},
		dragStart: (state, action: PayloadAction<any>) => {
			state.squareBeingDragged = action.payload;
		},
		dragDrop: (state, action: PayloadAction<any>) => {
			state.squareBeingReplaced = action.payload;
		},
		dragEnd: dragEndReducer,
		moveBelow: moveBelowReducer,
	},
});

export const store = configureStore({
	reducer: {
		crushCandy: crushCandySlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const { updateBoard, moveBelow, dragDrop, dragEnd, dragStart } =
	crushCandySlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
