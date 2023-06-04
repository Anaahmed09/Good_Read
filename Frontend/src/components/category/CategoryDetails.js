import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryDetails } from "Redux/asyncThunk";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
import MKBox from "components/MKBox";

export default function CategoryDetails() {
  const categoryBooks = useSelector((state) => state.categorySlice.categoryBooks);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(categoryDetails(id));
  }, [dispatch]);
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
        {categoryBooks[0] && (
          <>
            <h1 className="mb-4">{categoryBooks[0].categoryId.name}</h1>
            <div className="row justify-content-center gap-4">
              {categoryBooks.map((book) => (
                <Grid item xs={12} sm={6} lg={3} key={book._id}>
                  <BackgroundBlogCard
                    image={book.photo}
                    // image={mainImage}
                    title={book.name}
                    description={book.authorId.name}
                    action={{
                      type: "internal",
                      route: "/pages/blogs/author",
                      // route: `${book._id}/details`,
                      label: "Read More",
                    }}
                  />
                </Grid>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
