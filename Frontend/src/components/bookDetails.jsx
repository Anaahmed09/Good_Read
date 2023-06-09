import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";
import MKBox from "components/MKBox";
import { booksAPI } from "../Api/Book";
import { createRateAndStatus } from "Redux/userdashboard/slice";
import Button from "@mui/material/Button";

const user_id = localStorage.getItem("user_id");

export default function BookDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [book, setBook] = useState(false);
  const { id } = useParams();
  const getBook = async () => {
    let response = await booksAPI.getBookById(id);
    setBook(response.data.book);
  };

  const handleAdd = (myData) => {
    dispatch(createRateAndStatus(myData));
  };

  useEffect(() => {
    getBook();
  }, []);
  return (
    <>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(https://images.wallpaperscraft.com/image/single/books_library_shelves_138556_3840x2160.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>

      <Container className="mt-3">
        {book && (
          <>
            <h1 className="mb-4"></h1>
            <div className="row justify-content-center gap-4">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <img
                    src={book.photo}
                    style={{ width: "30vh", height: "100%", objectFit: "cover" }}
                  />
                </Grid>
                <Grid className="mx-2" item xs={4}>
                  <h2 className="mx-3 mb-2">Book: {book.name}</h2>
                  <h3 className="mx-3 mb-2">Author: {book.authorId.firstName}</h3>
                  <h4 className="mx-3 mb-2">Category: {book.categoryId.name}</h4>
                  <Button
                    className="btn btn-success mx-3 mt-5"
                    variant=""
                    onClick={() => {
                      handleAdd({ book: book._id, user: user_id });
                      navigate("/userDashboard");
                    }}
                  >
                    {" "}
                    Add to wishlist
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
