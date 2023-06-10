import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://goodread-api.onrender.com";
const authToken = localStorage.getItem("authToken");

export const findAll = createAsyncThunk("category/findAll", async () => {
  try {
    return (
      await axios.get(`${url}/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
    ).data;
  } catch (error) {
    throw new Error(`Error in fetching data form categories api ${error.message}`);
  }
});

export const addCategory = createAsyncThunk("category/addCategory", async ({ name }) => {
  try {
    await axios.post(
      `${url}/admin/categories`,
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error(`Error in add category api ${error.message}`);
  }
});

export const editCategory = createAsyncThunk("category/editCategory", async (category) => {
  try {
    await axios.put(
      `${url}/admin/categories/${category._id}`,
      {
        name: category.name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error(`Error in edit category api ${error.message}`);
  }
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (_id) => {
  try {
    await axios.delete(`${url}/admin/categories/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    throw new Error(`Error in delete category api ${error.message}`);
  }
});

export const categoryDetails = createAsyncThunk("category/findAllBooks", async (_id) => {
  try {
    return (
      await axios.get(`${url}/user/categories/${_id}/books`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
    ).data;
  } catch (error) {
    throw new Error(`Error in fetching all books api ${error.message}`);
  }
});
