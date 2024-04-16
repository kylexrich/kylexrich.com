import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import kylexrichApi from '../api/kylexrichAxios.ts';
import {BaseState} from './interfaces/BaseState.ts';
import {getRejectedValue, handleLoading, handleRejected} from './asyncThunkHelpers.ts';
import {RESET_ALL_ERRORS} from './globalActions.ts';

// =================== Types ===================
export interface LoginInfo {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthState extends BaseState {
    userId: string | null;
}

// =================== Async thunks ===================
export const login = createAsyncThunk<User, LoginInfo>('auth/loginUser', async (payload: LoginInfo,
                                                                                {rejectWithValue}) => {
    try {
        const response: AxiosResponse<User> = await kylexrichApi.post<User>('/auth/login', payload);
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const logout = createAsyncThunk<string, void>('auth/logoutUser', async (_, {rejectWithValue}) => {
    try {
        const response: AxiosResponse<string> = await kylexrichApi.post<string>('/auth/logout');
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
    }
});

export const me = createAsyncThunk<User, void>('auth/getUser', async (_, {rejectWithValue}) => {
    try {
        const response: AxiosResponse<User> = await kylexrichApi.get<User>('/auth/me');
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(getRejectedValue(error));
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
        builder.addCase(login.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(login.rejected, (state: AuthState, action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(login.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(me.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(me.rejected, (state: AuthState) => handleLoading(state, false));
        builder.addCase(me.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
            state.userId = action.payload._id;
            handleLoading(state, false);
        });
        builder.addCase(logout.pending, (state: AuthState) => handleLoading(state, true));
        builder.addCase(logout.rejected, (state: AuthState,
                                          action: PayloadAction<unknown>) => handleRejected(state, action));
        builder.addCase(logout.fulfilled, (state: AuthState) => {
            state.userId = null;
            handleLoading(state, false);
        });
        builder.addMatcher((action: PayloadAction<string>) => action.type === RESET_ALL_ERRORS, (state: AuthState) => {
            state.error = null;
        });
    }
});

export default authSlice.reducer;
