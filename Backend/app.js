const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const multer = require("multer");
const userRouter = require("./Routes/User");
const usercontroller = require("./Controllers/Users/user.controller");
const morgan = require("morgan");
const auhorRouter = require("./Routes/author-routes");
// const bookRouter = require("./Routes/book-routes");
const auth = require("./middleware/auth");
const bookRouter = require("./Routes/bookRoute");
const rateRouter = require("./Routes/rate.routes");
const ISADMIN = require("./middleware/IsAdmin");
const upload = require("./utils/multer-upload");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

// serving the static uploads directory
app.use("/uploads", express.static("uploads"));

//  show logs in development environment
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.post("/register", upload.single("image"), usercontroller.registeration);
app.post("/Adminlogin", usercontroller.Adminloggedin);
app.post("/Userlogin", usercontroller.Userloggedin);
app.use("/users", userRouter);
// app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/rates", auth, rateRouter);
// app.use("/categories", categoryRouter);
app.use("/admins", ISADMIN, userRouter);
app.use("/api/v1/authors", auhorRouter);
// book resource routes
// app.use("/api/v1/books", bookRouter);
const categoryUser = require("./Routes/category/user");
const categoryAdmin = require("./Routes/category/admin");
const authShared = require("./middleware/authShared");
app.use("/user", auth, categoryUser);
app.use("/admin", ISADMIN, categoryAdmin);
app.use("/categories", authShared, require("./Routes/category/shared"));

module.exports = app;
