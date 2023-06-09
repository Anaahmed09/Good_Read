import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "assets/images/home/bg-book-5.jpg";

import { useNavigate, useParams } from "react-router-dom";
import MKBox from "components/MKBox";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from "mdb-react-ui-kit";
import MKButton from "components/MKButton";

const AuthorDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAuthor() {
      const response = await axios.get(`http://localhost:3500/api/v1/authors/${id}`);
      console.log(response.data.data.author);

      setAuthor(response.data.data.author);
    }
    fetchAuthor();
  }, [id]);

  if (!author) {
    <div>Loading...</div>;
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
      ></MKBox>
      <div className="container mt-4">
        {/* Author Inof */}
        <div className="row">
          <div className="col-lg-4">
            <img src={author.image} className="img-thumbnail" alt="img-thumbnail" />
          </div>
          <div className="col-lg-8">
            <h2 className="card-title">{`${author.firstName} ${author.firstName}`}</h2>
            <p className="lead">{new Date(author.dateOfBirth).toLocaleDateString("en-US")}</p>
          </div>
        </div>
        {/* Author Books */}

        {author.books && author.books.length > 0 ? (
          <div className="row row-cols-lg-4 row-cols-md-3 row-cols-md-2 g-3 my-4">
            {author.books.map((item) => (
              <MDBRow className="col-sm-6 col-lg-4 " key={item._id}>
                <MDBCol className="border mx-1 my-1">
                  <MDBCard className="h-50 border">
                    <MDBCardImage src={item?.photo} alt="..." position="top" />
                    <MDBCardBody>
                      <div className="d-flex flex-column mt-2">
                        <p className="fs-4 m-0">Book</p>
                        <MKButton
                          variant="gradient"
                          color="info"
                          onClick={() => {
                            navigate(`/books/${item._id}`);
                          }}
                        >
                          {item?.name}
                        </MKButton>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              // <div key={book._id} className="col">
              //   <div className="card">
              //     {/* <img src={author.image} className="card-img-top" alt={author.firstName} /> */}
              //     <div className="card-body">
              //       <h5 className="card-title">{book.name}</h5>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        ) : (
          <p className="alert alert-info text-center my-4">No Books for The Author</p>
        )}
      </div>
    </>
  );
};

export default AuthorDetails;
