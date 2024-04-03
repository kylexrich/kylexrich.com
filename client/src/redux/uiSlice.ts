import { createSlice } from '@reduxjs/toolkit';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/BaseState';
import { ACCENT_COLOURS, AccentColor } from '../theme/accentColor';

// =================== Types ===================
export interface UIState extends BaseState {
    accentColor: AccentColor;
}

// =================== Initial state ===================
const initialState: UIState = {
    loading: false,
    error: null,
    accentColor: AccentColor.Blue
};

// =================== Slice ===================
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeAccentColor: (state) => {
            const currentIndex = ACCENT_COLOURS.indexOf(state.accentColor);
            const nextIndex = (currentIndex + 1) % ACCENT_COLOURS.length;
            state.accentColor = ACCENT_COLOURS[nextIndex];
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

export const { changeAccentColor } = uiSlice.actions;

export default uiSlice.reducer;
