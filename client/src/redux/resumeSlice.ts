// resumeSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getErrorMessage,
    getRequestBlobError,
    handleLoading,
    handlePending,
    handleRejected
} from './asyncThunkHelpers';
import kylexrichApi from '../api/kylexrichAxios';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/baseState';

// =================== Types ===================
export type ResumeState = {
    recentResumeBlobUrl: string | null;
} & BaseState;

// =================== Async thunks ===================
export const fetchLatestResume = createAsyncThunk<string>('resume/fetchLatestResume', async () => {
    try {
        const response = await kylexrichApi.get(`/resume/latest`, { responseType: 'blob' });
        return URL.createObjectURL(response.data as Blob);
    } catch (error) {
        throw getErrorMessage(await getRequestBlobError(error));
    }
});

export const uploadResume = createAsyncThunk<string, File>('resume/uploadResume', async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    try {
        const response = await kylexrichApi.post('/resume', formData, { responseType: 'blob' });
        return URL.createObjectURL(response.data as Blob);
    } catch (error) {
        throw getErrorMessage(await getRequestBlobError(error));
    }
});

// =================== Initial state ===================
const initialState: ResumeState = {
    recentResumeBlobUrl: null,
    loading: false,
    error: null
};

// =================== Slice ===================
const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadResume.pending, handlePending);
        builder.addCase(uploadResume.rejected, handleRejected);
        builder.addCase(uploadResume.fulfilled, (state, action) => {
            state.recentResumeBlobUrl = action.payload;
            handleLoading(state, false);
        });
        builder.addCase(fetchLatestResume.pending, handlePending);
        builder.addCase(fetchLatestResume.rejected, handleRejected);
        builder.addCase(fetchLatestResume.fulfilled, (state, action) => {
            state.recentResumeBlobUrl = action.payload;
            handleLoading(state, false);
        });
        builder.addMatcher(
            (action) => action.type === RESET_ALL_ERRORS,
            (state) => {
                state.error = null;
            }
        );
    }
});

export default resumeSlice.reducer;
