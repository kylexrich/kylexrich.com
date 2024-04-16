import {configureStore} from '@reduxjs/toolkit';
import uiReducer from './uiSlice.ts';
import authReducer from './authSlice.ts';
import resumeReducer from './resumeSlice.ts';
import githubReducer from './githubSlice.ts';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        resume: resumeReducer,
        github: githubReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
