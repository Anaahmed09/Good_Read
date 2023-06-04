/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKAlert from "components/MKAlert";
import "./modalForm.css";
function ModalForm(props) {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const [category, setCategory] = useState({
    categoryName: props.categoryName,
  });

  const validationForm = Yup.object().shape({
    categoryName: Yup.string().min(3, "This name is too short!").required("This name is required"),
  });

  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <MKButton variant="gradient" color={props.styleBtn} onClick={toggleModal}>
            {props.content}
          </MKButton>
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">{props.status}</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                {!props.delete && (
                  <Formik
                    validationSchema={validationForm}
                    initialValues={category}
                    enableReinitialize={category}
                    onSubmit={(value) => {
                      value.name = value.categoryName;
                      if (props._id) value._id = props._id;
                      props.handleSubmit(value);
                      toggleModal();
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <label htmlFor="categoryName" className="form-label">
                          Category Name
                        </label>
                        <Field
                          name="categoryName"
                          id="categoryName"
                          className="my-3 mb-3 form-control"
                          type="text"
                          placeholder="Category Name"
                        />
                        {errors.categoryName && touched.categoryName && (
                          <MKAlert color="error">
                            <ErrorMessage name="categoryName" />
                          </MKAlert>
                        )}
                        <Divider sx={{ my: 0 }} />
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                          <MKButton
                            className="m-auto"
                            type="submit"
                            color={errors.categoryName ? "light" : "info"}
                          >
                            {props.status}
                          </MKButton>
                        </MKBox>
                      </Form>
                    )}
                  </Formik>
                )}
                {props.delete && (
                  <>
                    Are you sure to delete this category ?
                    <Divider sx={{ my: 4 }} />
                    <MKBox display="flex" justifyContent="space-between" p={1.5}>
                      <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                        close
                      </MKButton>
                      <MKButton
                        variant="gradient"
                        color="error"
                        onClick={() => {
                          props.deleteCategory(props._id);
                          toggleModal();
                        }}
                      >
                        Delete
                      </MKButton>
                    </MKBox>
                  </>
                )}
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  );
}

export default ModalForm;
