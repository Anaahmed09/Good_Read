import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { booksAPI } from "../Api/Book";
import MKBox from "./MKBox";
import headerImg from "assets/images/home/bg-book-5.jpg";

export default function BookForm() {
  let navigate = useNavigate();
  let [formValue, setFormValues] = useState({});

  const operationHandler = (e) => {
    setFormValues({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  let [book, setBook] = useState({});
  const { id } = useParams();

  let [categoryList, setCategory] = useState([]);
  let [authorList, setAuthor] = useState([]);

  const getAllCategories = async () => {
    try {
      let response = await booksAPI.getAllCategories();
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllAuthors = async () => {
    try {
      let response = await booksAPI.getAllAuthors();
      const data = JSON.stringify(response.data.data.authors);
      setAuthor(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };

  const getBookById = async () => {
    let response = await booksAPI.getBookById(id);
    setBook(response.data.book);
    setFormValues(response.data.books);
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
    if (id == 0) {
      await booksAPI.addBook(formValue);
    } else {
      await booksAPI.editBook(id, formValue);
    }
    navigate("/books");
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
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Select size="lg" name="categoryId" onChange={operationHandler}>
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
            <Form.Select size="lg" name="authorId" onChange={operationHandler}>
              {authorList.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
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
