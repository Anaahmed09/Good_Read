import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalForm";
import { addCategory, deleteCategory, editCategory, findAll } from "Redux/asyncThunk";
import { deleteMessage } from "Redux/categorySlice";
import MKAlert from "components/MKAlert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import headerImg from "assets/images/main.jpg";
import MKBox from "components/MKBox";

export default function AllCategories() {
  const categories = useSelector((state) => state.categorySlice.category);
  const message = useSelector((state) => state.categorySlice.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAll());
  }, [message]);

  const handleSubmit = (value) => {
    if (value._id) dispatch(editCategory(value));
    else dispatch(addCategory(value));
    setTimeout(() => dispatch(deleteMessage()), 5000);
  };

  const handelDeleteCategory = (_id) => {
    dispatch(deleteCategory(_id));
    setTimeout(() => dispatch(deleteMessage()), 5000);
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
      <div className="container">
        <ModalForm
          content={<i className="bi bi-plus-square"></i>}
          styleBtn={"info"}
          status={"Add Category"}
          handleSubmit={handleSubmit}
          categoryName=""
        />
        {message && <MKAlert color="success">{message}</MKAlert>}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <thead>
              <TableRow>
                <TableCell align="center" className="bold">
                  ID
                </TableCell>
                <TableCell align="center" className="bold">
                  Category Name
                </TableCell>
                <TableCell align="center" className="bold">
                  Actions
                </TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {categories &&
                categories.map((category, index) => (
                  <TableRow
                    key={category._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <tr  style={{ height: "60px" }}> */}
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{category.name}</TableCell>
                    <TableCell className="d-flex justify-content-around">
                      <ModalForm
                        content={<i className="bi bi-pencil"></i>}
                        styleBtn={"warning"}
                        status={"Edit Category"}
                        handleSubmit={handleSubmit}
                        categoryName={category.name}
                        _id={category._id}
                      />
                      <ModalForm
                        content={<i className="bi bi-trash3"></i>}
                        styleBtn={"error"}
                        status={"Delete Category"}
                        handleSubmit={handleSubmit}
                        _id={category._id}
                        delete={1}
                        deleteCategory={handelDeleteCategory}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
