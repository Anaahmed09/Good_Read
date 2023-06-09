import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import MKBox from "components/MKBox";
import headerImg from "assets/images/main.jpg";
import { Paper, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import MKButton from "components/MKButton";

const AuthorTable = () => {
  // Authors State
  const [authors, setAuthors] = useState([]);

  // Model State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add new author form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    image: "",
  });

  const clearFormDara = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      image: "",
    });
  };

  // Fetching authors data when component mounted to the DOM
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    fetch("http://localhost:3500/api/v1/authors")
      .then((res) => res.json())
      .then((authorsData) => {
        setAuthors(authorsData.data.authors);
      })
      .catch((err) => console.log(err));
  };

  // deleteing authors
  const deleteAuthor = (id) => {
    fetch(`http://localhost:3500/api/v1/authors/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        fetchAuthors();
      }
    });
  };

  // handel add new author form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:3500/api/v1/authors", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // handle successful form submission
        // reset form data
        clearFormDara();
        // close the model
        handleClose();
        // fetching authors
        fetchAuthors();
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
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
      <div className="container mt-4">
        <div className="mb-4 d-flex justify-content-center">
          <MKButton variant="gradient" color="info" onClick={handleShow}>
            Add Author
          </MKButton>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Author</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  type="text"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Profile image</Form.Label>
                <Form.Control
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  type="file"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  type="date"
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <thead>
              <TableRow>
                <TableCell align="center" className="bold">
                  ID
                </TableCell>
                <TableCell align="center" className="bold">
                  Photo
                </TableCell>
                <TableCell align="center" className="bold">
                  First Name
                </TableCell>
                <TableCell align="center" className="bold">
                  Last Name
                </TableCell>
                <TableCell align="center" className="bold">
                  Actions
                </TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {authors.map((author, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={author._id}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <img
                      className="img-thumbnail"
                      style={{ width: "96", height: "96px" }}
                      src={author.image}
                      alt={author.title}
                    />
                  </TableCell>
                  <TableCell align="center">{author.firstName}</TableCell>
                  <TableCell align="center">{author.lastName}</TableCell>
                  <TableCell className="d-flex align-items-center gap-2 justify-content-center">
                    <MKButton
                      variant="gradient"
                      color="error"
                      onClick={() => deleteAuthor(author._id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </MKButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AuthorTable;
