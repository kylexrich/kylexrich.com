import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import kylexrichApi from '../api/kylexrichAxios';
import { handleLoading, handlePending, handleRejected, throwRequestError } from './asyncThunkHelpers';
import { RESET_ALL_ERRORS } from './globalActions';
import { BaseState } from './interfaces/baseState';

// =================== Types ===================
type LoginInfo = {
    email: string;
    password: string;
};

type User = {
    _id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

type AuthState = {
    userId: string | null;
} & BaseState;

// =================== Async thunks ===================
export const login = createAsyncThunk<User, LoginInfo>('auth/login', async (payload: LoginInfo) => {
    try {
        const response = await kylexrichApi.post('/auth/login', payload);
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

export const logout = createAsyncThunk<string>('auth/logout', async () => {
    try {
        const response = await kylexrichApi.post('/auth/logout');
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

export const me = createAsyncThunk<User>('auth/me', async () => {
    try {
        const response = await kylexrichApi.get('/auth/me');
        return response.data.user;
    } catch (error) {
        throwRequestError(error);
    }
});

// =================== Initial state ===================
const initialState: AuthState = {
    userId: null,
    loading: false,
    error: null
};

// =================== Slice ===================
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
        builder.addMatcher(
            (action) => action.type === RESET_ALL_ERRORS,
            (state) => {
                state.error = null;
            }
        );
    }
});

export default authSlice.reducer;
