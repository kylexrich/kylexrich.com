import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ACCENT_COLOURS, AccentColor} from '../theme/accentColor.ts';
import {BaseState} from './interfaces/BaseState.ts';
import {RESET_ALL_ERRORS} from './globalActions.ts';

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
        changeAccentColor: (state: UIState) => {
            const currentIndex = ACCENT_COLOURS.indexOf(state.accentColor);
            const nextIndex = (currentIndex + 1) % ACCENT_COLOURS.length;
            state.accentColor = ACCENT_COLOURS[nextIndex]!;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action: PayloadAction<string>) => action.type === RESET_ALL_ERRORS,
            (state: UIState) => {
                state.error = null;
            }
        );
    }
});

export const {changeAccentColor} = uiSlice.actions;

export default uiSlice.reducer;
