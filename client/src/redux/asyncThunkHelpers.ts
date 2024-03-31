import { ErrorResponse, isErrorAction, isErrorResponse, isResponse } from './interfaces/errorModels';
import { BaseState } from './interfaces/baseState';

export async function getRequestBlobError(error: unknown) {
    if (isResponse(error) && error.response.data instanceof Blob) {
        const errorText = await new Response(error.response.data).text();
        const errorJson = JSON.parse(errorText);
        console.log({ response: { data: errorJson } });
        return { response: { data: errorJson } };
    } else {
        return error;
    }
}

export const throwRequestError = (error: ErrorResponse | unknown) => {
    throw getErrorMessage(error);
};

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && !(isErrorResponse(error) && error.response?.data?.error)) {
        return error.message;
    } else if (isErrorResponse(error) && error.response?.data?.error) {
        return error.response.data.error;
    }
    return 'An unexpected error occurred';
};

export const handleLoading = (state: BaseState, loadingStatus: boolean) => {
    state.loading = loadingStatus;
    state.error = null;
};

export const handlePending = (state: BaseState) => {
    handleLoading(state, true);
};

export const handleRejected = (state: BaseState, action: unknown) => {
    if (isErrorAction(action)) {
        state.error = action.error.message;
        state.loading = false;
    }
};
