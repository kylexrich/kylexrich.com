import { ErrorResponse, isErrorAction, isErrorResponse } from "./models/errorModel";
import { BaseState } from "./models/baseModel";

export const throwRequestError = (error: ErrorResponse | unknown) => {
  throw getErrorMessage(error);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (isErrorResponse(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return "An unexpected error occurred";
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
