import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResumeModels } from "../interfaces/resumeModels";
import {
  getErrorMessage,
  getRequestBlobError,
  handleLoading,
  handlePending,
  handleRejected,
} from "./asyncThunkHelpers";
import api from "../api/axiosInstance";

export const fetchLatestResume = createAsyncThunk<string>("recentResumeBlobUrl/fetchLatestResume", async () => {
  try {
    const response = await api.get(`/resume/latest`, { responseType: "blob" });
    const pdf = response.data as Blob;
    return URL.createObjectURL(pdf);
  } catch (error) {
    throw getErrorMessage(await getRequestBlobError(error));
  }
});

export const uploadResume = createAsyncThunk<string, File>("uploadResume", async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  try {
    const response = await api.post("/resume", formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const pdf = response.data as Blob;
    return URL.createObjectURL(pdf);
  } catch (error) {
    throw getErrorMessage(await getRequestBlobError(error));
  }
});

const initialState: ResumeModels = {
  recentResumeBlobUrl: null,
  loading: false,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadResume.pending, (state) => handlePending(state));
    builder.addCase(uploadResume.rejected, (state, action) => handleRejected(state, action));
    builder.addCase(uploadResume.fulfilled, (state, action) => {
      if (state && action.payload) {
        state.recentResumeBlobUrl = action.payload;
      }
      handleLoading(state, false);
    });
    builder.addCase(fetchLatestResume.pending, (state) => handlePending(state));
    builder.addCase(fetchLatestResume.rejected, (state, action) => handleRejected(state, action));
    builder.addCase(fetchLatestResume.fulfilled, (state, action) => {
      if (state && action.payload) {
        state.recentResumeBlobUrl = action.payload;
      }
      handleLoading(state, false);
    });
  },
});

export const { resetError } = uiSlice.actions;

export default uiSlice.reducer;
