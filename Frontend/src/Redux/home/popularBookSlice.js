import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3500";
const nestedRoute = "/books/popularBooksAndAuthor";

export const popularBooksSlice = createAsyncThunk("popularBooksSection/popularBooks", async () => {
  try {
    const response = await fetch(`${baseURL}${nestedRoute}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching Popular Books data");
  }
});

const popularBookSlice = createSlice({
  name: "popularBooksSection",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(popularBooksSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(popularBooksSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(popularBooksSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default popularBookSlice.reducer;
