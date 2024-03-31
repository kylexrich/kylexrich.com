import { createSlice } from '@reduxjs/toolkit';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/baseState';

// =================== Types ===================

// =================== Initial state ===================
const initialState: BaseState = {
    loading: false,
    error: null
};

// =================== Slice ===================
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type === RESET_ALL_ERRORS,
            (state) => {
                state.error = null;
            }
        );
    }
});

export default uiSlice.reducer;
