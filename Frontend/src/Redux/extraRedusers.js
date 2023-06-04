import { addCategory, categoryDetails, deleteCategory, editCategory, findAll } from "./asyncThunk";

export const extraReducers = (builder) => {
  builder
    .addCase(findAll.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    })
    .addCase(findAll.pending, (state) => {
      state.loading = true;
    })
    .addCase(findAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  builder
    .addCase(addCategory.fulfilled, (state) => {
      state.loading = false;
      state.message = "Category Added Successfully";
    })
    .addCase(addCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  builder
    .addCase(editCategory.fulfilled, (state) => {
      state.loading = false;
      state.message = "Category Edited Successfully";
    })
    .addCase(editCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(editCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  builder
    .addCase(deleteCategory.fulfilled, (state) => {
      state.loading = false;
      state.message = "Category Deleted Successfully";
    })
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  builder
    .addCase(categoryDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryBooks = action.payload;
    })
    .addCase(categoryDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(categoryDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
