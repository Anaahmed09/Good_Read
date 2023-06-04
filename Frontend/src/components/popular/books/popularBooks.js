import Grid from "@mui/material/Grid";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
import MKTypography from "components/MKTypography";
import Box from "@mui/material/Box";
import MKButton from "components/MKButton";
import "./popularBooks.css";
import { useNavigate } from "react-router-dom";

function popularBooks({ popularData }) {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="mb-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} className="text-center">
            <MKTypography variant="h1">Popular Books</MKTypography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} className="mb-4">
        {popularData.map((book) => (
          <Grid item xs={4} key={book._id} className="mb-4">
            <BackgroundBlogCard
              image={book.photo}
              title={book.name}
              description="Rather than worrying about switching offices every couple years, you stay in the same place."
              action={{
                type: "internal",
                route: `/books/${book._id}`,
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={12} className="text-center mb-4">
          <MKTypography variant="h1">Popular Authors</MKTypography>
        </Grid>
        {popularData.map((book) => (
          <Grid item xs={4} key={book._id}>
            <MKButton
              variant="gradient"
              color="secondary"
              className="w-100"
              onClick={() => {
                navigate(`/users/authors/${book.authorId._id}/books`);
              }}
            >
              {book.authorId.firstName}
            </MKButton>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} className="text-center mb-4">
          <MKTypography variant="h1">Popular Categories</MKTypography>
        </Grid>
        {popularData.map((book) => (
          <Grid item xs={4} key={book.categoryId._id}>
            <MKButton
              variant="gradient"
              color="info"
              className="w-100"
              onClick={() => {
                navigate(`/categories/${book.categoryId._id}/books`);
              }}
            >
              {book.categoryId.name}
            </MKButton>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default popularBooks;
