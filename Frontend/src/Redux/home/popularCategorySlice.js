import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3500";
const nestedRoute = "/rates";

export const fetchApiData = createAsyncThunk("userDashboard/fetchData", async () => {
  try {
    const response = await fetch(`${baseURL}${nestedRoute}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching user Dashboard data");
  }
});

export const updateRateOrStatus = createAsyncThunk("userDashboard/update", async (data) => {
  try {
    const { id, rate, status, user, book } = data;
    const response = await fetch(`${baseURL}${nestedRoute}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rate, status, user, book }),
    });
    if (!response.ok) throw new Error("Error updating user Dashboard");
  } catch (error) {
    throw new Error("Error in sending Data");
  }
});

const apiDataSlice = createSlice({
  name: "userDashboard",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateRateOrStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRateOrStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateRateOrStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default apiDataSlice.reducer;
