// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
// import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
// import Author from "layouts/pages/landing-pages/author";
import Home from "./components/Home/home.jsx";
import Categories from "components/category/Categories.js";
import Book from "components/Book";
// import AuthorList from "ourcomponents/AuthorUserView/AuthorList";

const routes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/",
    component: <Home />,
  },
  {
    name: "Categories",
    icon: <Icon>category</Icon>,
    route: "/categories/groups",
    component: <Categories />,
  },
  // {
  //   name: "Authors",
  //   icon: <Icon>person</Icon>,
  //   route: "/authors",
  //   component: <Author />,
  // },
  {
    name: "Books",
    icon: <Icon>book</Icon>,
    route: "/book",
    component: <Book />,
  },
  // {
  //   name: "Authors",
  //   icon: <Icon>person</Icon>,
  //   route: "/users/authors",
  //   component: <AuthorList />,
  // },
  {
    name: "About Us ",
    icon: <Icon>article</Icon>,
    route: "/pages/landing-pages/about-us",
    component: <AboutUs />,
  },
  {
    name: "Contact Us",
    icon: <Icon>phone</Icon>,
    route: "/pages/landing-pages/contact-us",
    component: <ContactUs />,
  },
  {
    name: "Dashboard",
    icon: <Icon>dashboard</Icon>,
    route: "/userdashboard",
    component: <ContactUs />,
  },
];

export default routes;
