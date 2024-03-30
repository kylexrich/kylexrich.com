import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { handleLoading, handlePending, handleRejected, throwRequestError } from './asyncThunkHelpers';
import { AuthState, LoginInfo, User } from '../interfaces/authState';
import { resetError } from './uiSlice';

export const login = createAsyncThunk<User, LoginInfo>('auth/login', async (payload) => {
    try {
        const response = await api.post('/auth/login', payload);
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

export const logout = createAsyncThunk<string>('auth/logout', async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

export const me = createAsyncThunk<User>('auth/myIcon', async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

const initialState: AuthState = {
    userId: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => handlePending(state));
        builder.addCase(login.rejected, (state, action) => handleRejected(state, action));
        builder.addCase(login.fulfilled, (state, action) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(me.pending, (state) => handlePending(state));
        builder.addCase(me.rejected, (state, action) => handleLoading(state, false));
        builder.addCase(me.fulfilled, (state, action) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(logout.pending, (state) => handlePending(state));
        builder.addCase(logout.rejected, (state, action) => handleRejected(state, action));
        builder.addCase(logout.fulfilled, (state, action) => {
            state.userId = null;
            handleLoading(state, false);
        });
        builder.addCase(resetError, (state) => {
            state.error = null;
        });
    }
});

export default authSlice.reducer;
