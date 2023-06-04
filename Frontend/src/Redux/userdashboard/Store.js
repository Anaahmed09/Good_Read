import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice";
import categorySlice from "Redux/categorySlice";
import popularBookSlice from "Redux/home/popularBookSlice";

const store = configureStore({
  reducer: {
    userDashboard: dataReducer,
    categorySlice,
    popularBookSlice,
  },
});
export default store;
