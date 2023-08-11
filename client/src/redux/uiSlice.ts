import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResumeState } from "./models/uiModel";
import { handleLoading, handlePending, handleRejected, throwRequestError } from "./asyncThunkHelpers";
import api from "../api/axiosInstance";

export const fetchMostRecentResume = createAsyncThunk("resumeBlobUrl/fetchMostRecent", async () => {
  try {
    const response = await api.get(`/resume/most-recent`, { responseType: "blob" });
    const pdf = response.data as Blob;
    return URL.createObjectURL(pdf);
  } catch (error: unknown) {
    throwRequestError(error);
  }
});

export const fetchResume = createAsyncThunk("resumeBlobUrl/fetch", async (id: string) => {
  try {
    const response = await api.get(`/api/resume/${id}`, { responseType: "blob" });
    const pdf = response.data as Blob;
    return URL.createObjectURL(pdf);
  } catch (error: unknown) {
    throwRequestError(error);
  }
});

export const uploadResume = createAsyncThunk<string, File>("uploadResume", async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  try {
    const response = await api.post("/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    throwRequestError(error);
  }
});

const initialState: ResumeState = {
  resumeBlobUrl: null,
  loading: false,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadResume.pending, (state) => handlePending(state));
    builder.addCase(uploadResume.rejected, (state, action) => handleRejected(state, action));
    builder.addCase(uploadResume.fulfilled, (state) => handleLoading(state, false));
    builder.addCase(fetchResume.pending, (state) => handlePending(state));
    builder.addCase(fetchResume.rejected, (state, action) => handleRejected(state, action));
    builder.addCase(fetchResume.fulfilled, (state, action) => {
      if (state && action.payload) {
        state.resumeBlobUrl = action.payload;
      }
      handleLoading(state, false);
    });
    builder.addCase(fetchMostRecentResume.pending, (state) => handlePending(state));
    builder.addCase(fetchMostRecentResume.rejected, (state, action) => handleRejected(state, action));
    builder.addCase(fetchMostRecentResume.fulfilled, (state, action) => {
      if (state && action.payload) {
        state.resumeBlobUrl = action.payload;
      }
      handleLoading(state, false);
    });
  },
});

//export const {} = uiSlice.actions;
export default uiSlice.reducer;
