import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { booksAPI } from "../Api/Book";
import MKBox from "./MKBox";
import headerImg from "assets/images/home/bg-book-5.jpg";

export default function BookForm() {
  let navigate = useNavigate();
  let [formValue, setFormValues] = useState({});
  let [categoryList, setCategory] = useState([]);
  let [authorList, setAuthor] = useState([]);

  let [book, setBook] = useState({
    name: "",
    photo: "",
    categoryId: { name: "" },
    authorId: { firstName: "", lastName: "" },
  });
  const { id } = useParams();

  const operationHandler = (e) => {
    setFormValues({
      ...formValue,

      [e.target.name]: e.target.value,
    });
  };

  const getAllCategories = async () => {
    try {
      let response = await booksAPI.getAllCategories();
      // console.log(response + "category");
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAuthors = async () => {
    try {
      let response = await booksAPI.getAllAuthors();
      console.log(JSON.stringify(response.data.data.authors) + "author");
      const data = JSON.stringify(response.data.data.authors);
      console.log("setauthor");
      console.log(data);
      setAuthor(JSON.parse(data));

      // console.log(typeof authorList);
    } catch (err) {
      console.log(err);
    }
  };

  const getBookById = async () => {
    let response = await booksAPI.getBookById(id);
    setBook(response.data.book);

    setFormValues(response.data.book);
  };

  useEffect(() => {
    if (id != 0) {
      getBookById();
    }
    getAllCategories();
    getAllAuthors();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formValue);
    if (id == 0) {
      await booksAPI.addBook(formValue);
    } else {
      await booksAPI.editBook(id, formValue);
    }
    navigate("/bookAdmin");
  };
  // console.log("book.authorId");
  // console.log(book.authorId);
  // console.log(book.categoryId.firstName);
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
      <div className="bg-dark p-5 text-center">
        <h2 className="text-muted m-4">{id == 0 ? "Add Book " : "Edit Book"}</h2>
        <Form className="bg-light p-5 rounded" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Book Name"
              onChange={operationHandler}
              defaultValue={book.name}
              required
              minLength={5}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Select size="lg" name="categoryId" onChange={operationHandler} required>
              <option value={book.categoryId._id} disabled selected>
                {id == 0 ? "Choose Category" : book?.categoryId.name}
              </option>
              {categoryList.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item?.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Select size="lg" name="authorId" onChange={operationHandler} required>
              <option value={book.authorId._id} key={book.authorId._id} disabled selected>
                {id == 0 ? "Choose Author" : book?.authorId.firstName}
              </option>

              {authorList.map((item) => {
                return (
                  <option key={item._id} value={item._id} defaultValue={item?.firstName}>
                    {item?.firstName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              name="photo"
              type="text"
              onChange={operationHandler}
              placeholder="Book IMage"
              defaultValue={book.photo}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {id == 0 ? "Add Book " : "Edit Book"}
          </Button>
        </Form>
      </div>
    </>
  );
}
