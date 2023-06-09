import axios from "axios";

let baseUrl = "http://localhost:3500/books";
let catUrl = "http://localhost:3500/categories";
let authUrl = "http://localhost:3500/api/v1/authors";
const authToken = localStorage.getItem("authToken");

const getAllAuthors = () => axios.get(authUrl);
const getAuthorById = (authId) => axios.get(`${authUrl}/${authId}`);

const getAllCategories = () =>
  axios.get(catUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
const getCategoryById = (catId) => axios.get(`${catUrl}/${catId}`);

const getAllBooks = () => axios.get(baseUrl);
const getBookById = (bookId) => axios.get(`${baseUrl}/${bookId}`);
const addBook = (book) => axios.post(baseUrl, book);
const deleteBook = (bookId) => axios.delete(`${baseUrl}/${bookId}`);
const editBook = (bookId, book) => axios.patch(`${baseUrl}/${bookId}`, book);

export const booksAPI = {
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
  addBook,
  getAllCategories,
  getCategoryById,
  getAllAuthors,
  getAuthorById,
};
