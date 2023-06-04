import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import headerImg from "assets/images/main.jpg";
import MKBox from "components/MKBox";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  // Fetching authors data when component mounted to the DOM
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    fetch("http://localhost:3500/api/v1/authors")
      .then((res) => res.json())
      .then((authorsData) => {
        console.log(authorsData);
        setAuthors(authorsData.data.authors);
      })
      .catch((err) => console.log(err));
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
      <div className="container row row-cols-lg-4 row-cols-md-3 row-cols-md-2 g-3 mt-4">
        {authors.map((author) => (
          <div key={author._id} className="col">
            <div className="card">
              <img src={author.image} className="card-img-top" alt={author.firstName} />
              <div className="card-body">
                <Link to={`/users/authors/${author._id}/books`}>
                  <h5 className="card-title">{`${author.firstName} ${author.firstName}`}</h5>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AuthorList;
