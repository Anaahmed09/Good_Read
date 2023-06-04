// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
// import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
// import AboutUs from "layouts/pages/landing-pages/about-us";
// import ContactUs from "layouts/pages/landing-pages/contact-us";
import Home from "./components/Home/home.jsx";
import BookAdmin from "./components/bookAdmin";
import AllCategories from "components/category/AllCategories.js";
import AuthorAdminView from "./ourcomponents/AuthorAdminView/AuthorTable.jsx";

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
    route: "/categories",
    component: <AllCategories />,
  },
  {
    name: "Authors",
    icon: <Icon>person</Icon>,
    route: "/dashboard/authors",
    component: <AuthorAdminView />,
  },
  {
    name: "Books",
    icon: <Icon>book</Icon>,
    route: "/bookAdmin",
    component: <BookAdmin />,
  },
];

export default routes;
