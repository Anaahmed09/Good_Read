import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraRedusers";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
    error: null,
    message: "",
    categoryBooks: [],
  },
  reducers: {
    deleteMessage(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    extraReducers(builder);
  },
});

export const { deleteMessage } = categorySlice.actions;
export default categorySlice.reducer;
