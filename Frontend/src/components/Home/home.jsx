import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
// import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
// import Pages from "pages/Presentation/sections/Pages";
// import Testimonials from "pages/Presentation/sections/Testimonials";
// import Download from "pages/Presentation/sections/Download";
import PopularBooks from "../popular/books/popularBooks";

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Images
import bgImage from "assets/images/home/bg-book-5.jpg";
// Routes
// import routes from "routes";
// import UserLogin from "components/user Login/userLogin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { popularBooksSlice } from "Redux/home/popularBookSlice";

function home() {
  const { data, isLoading, error } = useSelector((state) => state.popularBookSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(popularBooksSlice());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Newton{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Welcome to reading club Choose What you want
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        id="card"
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <Information />
        <Container>
          <PopularBooks popularData={data} />
        </Container>

        <Container sx={{ mt: 6 }}>
          <BuiltByDevelopers />
        </Container>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="menu_book"
                title="Fiction"
                description=" Includes novels, short stories, and other narrative works of imagination."
                action={{
                  type: "external",
                  route: "/",
                  label: "Explore",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="auto_awesome"
                title="Fantasy"
                description=" Books featuring magical or supernatural elements set in imaginary worlds."
                action={{
                  type: "external",
                  route: "/",
                  label: "Read more",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FilledInfoCard
                color="info"
                icon="favorite"
                title="Romance"
                description=" Books that explore romantic relationships and love stories."
                action={{
                  type: "external",
                  route: "/",
                  label: "Read more",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <MKBox pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                  Thank you for your time!
                </MKTypography>
                <MKTypography variant="body1" color="text">
                  We deliver what you want
                </MKTypography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                my={{ xs: 5, lg: "auto" }}
                mr={{ xs: 0, lg: "auto" }}
                sx={{ textAlign: { xs: "center", lg: "right" } }}
              >
                <MKSocialButton
                  component="a"
                  href="#"
                  target="_blank"
                  color="twitter"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-twitter" />
                  &nbsp;Tweet
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="#"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;Share
                </MKSocialButton>
                <MKSocialButton component="a" href="#" target="_blank" color="pinterest">
                  <i className="fab fa-pinterest" />
                  &nbsp;Pin it
                </MKSocialButton>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>
    </>
  );
}

export default home;
