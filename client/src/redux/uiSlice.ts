import { createSlice } from '@reduxjs/toolkit';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/baseState';
import { ACCENT_COLOURS, AccentColour } from '../theme/accentColour';

// =================== Types ===================
export type UIState = {
    accentColour: AccentColour;
} & BaseState;

// =================== Initial state ===================
const initialState: UIState = {
    loading: false,
    error: null,
    accentColour: AccentColour.Blue
};

// =================== Slice ===================
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeAccentColour: (state) => {
            const currentIndex = ACCENT_COLOURS.indexOf(state.accentColour);
            const nextIndex = (currentIndex + 1) % ACCENT_COLOURS.length;
            state.accentColour = ACCENT_COLOURS[nextIndex];
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type === RESET_ALL_ERRORS,
            (state) => {
                state.error = null;
            }
        );
    }
});

export const { changeAccentColour } = uiSlice.actions;

export default uiSlice.reducer;
