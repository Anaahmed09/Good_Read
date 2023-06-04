// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                color="#767364"
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Love Horror
                    <br />
                    Take The Risk
                  </>
                }
                description="Horror/paranormal book cover ... Available as front cover only for ebook or full cover for print for an extra cost of $25 . Adjustments to size and text can be made to suit your book."
              />
              <RotatingCardBack
                image={bgBack}
                title="Discover More"
                description="Horror/paranormal book cover ... Available as front cover only for ebook or full cover for print for an extra cost of $25 "
                action={{
                  type: "internal",
                  route: "/books/123",
                  label: "Read Now",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="book"
                  title="Horror Novels"
                  description="Horror/paranormal book cover ... Available "
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="watch"
                  title="Read Any Time"
                  description="The world's most popular react components library for building user interfaces."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="favorite"
                  title="Save Time"
                  description="Creating your design from scratch with dedicated designers can be very expensive. Start with our Design System."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="circle"
                  title="Keep Going"
                  description="Regardless of the screen size, the website content will naturally fit the given resolution."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
