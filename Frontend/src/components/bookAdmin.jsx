import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { booksAPI } from "../Api/Book";
import "./bookAdmin.css";
import MKBox from "./MKBox";
import headerImg from "assets/images/home/bg-book-5.jpg";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import MKButton from "./MKButton";

export default function BookAdmin() {
  const navigate = useNavigate();

  let [bookList, setBook] = useState([]);
  const getAllBooks = async () => {
    try {
      let response = await booksAPI.getAllBooks();
      setBook(response.data.books);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);

  const editBook = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };
  const deleteBook = async (bookId) => {
    await booksAPI.deleteBook(bookId);
    let filteredList = bookList.filter((book) => book._id != bookId);
    setBook(filteredList);
  };

  const goToAddPage = () => {
    navigate("/books/0/edit");
  };
  return (
    <>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${headerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>
      <div className="p-5 text-center">
        <div>
          {/* <MDBIcon fas icon="folder-plus" className="fs-1 " onClick={goToAddPage} /> */}
          <MKButton variant="gradient" color="info" onClick={goToAddPage}>
            <i className="bi bi-plus-square"></i>
          </MKButton>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <thead>
              <TableRow>
                <TableCell align="center" className="bold">
                  ID
                </TableCell>
                <TableCell align="center" className="bold">
                  Name
                </TableCell>
                <TableCell align="center" className="bold">
                  Photo
                </TableCell>
                <TableCell align="center" className="bold">
                  CategoryId
                </TableCell>
                <TableCell align="center" className="bold">
                  AuthorId
                </TableCell>
                <TableCell align="center" className="bold">
                  Actions
                </TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {bookList.map((item, index) => {
                {
                  console.log(item);
                }
                return (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item?.name}</TableCell>
                    <TableCell align="center">
                      <img src={item?.photo} alt="" />
                    </TableCell>
                    <TableCell align="center">{item?.categoryId.name}</TableCell>
                    <TableCell align="center">{item?.authorId.firstName}</TableCell>
                    <TableCell className="d-flex justify-content-around">
                      <MKButton
                        variant="gradient"
                        color="warning"
                        onClick={() => editBook(item._id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </MKButton>
                      <MKButton
                        variant="gradient"
                        color="error"
                        onClick={() => deleteBook(item._id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </MKButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
