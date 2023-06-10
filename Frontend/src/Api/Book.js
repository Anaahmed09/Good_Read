import axios from "axios";

let baseUrl = "https://technotes-api.onrender.com/books";
let catUrl = "https://technotes-api.onrender.com/categories";
let authUrl = "https://technotes-api.onrender.com/api/v1/authors";
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
