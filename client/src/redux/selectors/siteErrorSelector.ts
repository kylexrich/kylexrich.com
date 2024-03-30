import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const uiErrorSelector = (state: RootState) => state.ui.error;
const authErrorSelector = (state: RootState) => state.auth.error;

export const siteErrorSelector = createSelector([uiErrorSelector, authErrorSelector], (uiErr, authErr) => {
    return uiErr || authErr;
});
