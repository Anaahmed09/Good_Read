import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "Redux/asyncThunk";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import headerImg from "assets/images/main.jpg";

export default function Categories() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAll());
  }, []);
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

      <Container className="mt-4">
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          <Card className="py-5">
            <div className="row justify-content-center align-items-center gap-4">
              {categories &&
                categories.map((category) => (
                  <MKButton
                    key={category._id}
                    variant="gradient"
                    color="info"
                    className="col-4"
                    onClick={() => {
                      navigate(`/categories/${category._id}/books`);
                    }}
                  >
                    {category.name}
                  </MKButton>
                ))}
            </div>
          </Card>
        </Grid>
      </Container>
    </>
  );
}
