import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3500";
const authToken = localStorage.getItem("authToken");

export const findAll = createAsyncThunk("category/findAll", async () => {
  return (
    await axios.get(`${url}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
  ).data;
});

export const addCategory = createAsyncThunk("category/addCategory", async ({ name }) => {
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
});

export const editCategory = createAsyncThunk("category/editCategory", async (category) => {
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
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (_id) => {
  await axios.delete(`${url}/admin/categories/${_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
});

export const categoryDetails = createAsyncThunk("category/findAllBooks", async (_id) => {
  return (
    await axios.get(`${url}/user/categories/${_id}/books`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
  ).data;
});
