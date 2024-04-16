import {PayloadAction} from '@reduxjs/toolkit';
import {isBackendErrorResponse, isRejectedPayloadAction, RejectedValue} from './interfaces/BackendErrorResponse.ts';
import {BaseState} from './interfaces/BaseState.ts';

export function getRejectedValue(error: unknown): RejectedValue {
    let errorMessage = 'An unexpected error occurred';

    if (isBackendErrorResponse(error)) {
        errorMessage = error.response.data.errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return {errorMessage};
}

export const handleLoading = (state: BaseState, loadingStatus: boolean) => {
    state.loading = loadingStatus;
    state.error = null;
};

export const handleRejected = (state: BaseState, action: PayloadAction<unknown>) => {
    if (isRejectedPayloadAction(action)) {
        state.error = action.payload.errorMessage;
    } else {
        state.error = 'An unknown error occurred';
    }
    state.loading = false;
};
