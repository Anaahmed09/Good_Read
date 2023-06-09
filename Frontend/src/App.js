import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import routes from "routes";
import userRoutes from "user.routes";
import adminRoutes from "admin.routes";
import Adminpage from "ourcomponents/AdminLogin/Adminpage";
import Userpage from "ourcomponents/UserLogin/Userpage";
import Home from "./components/Home/home.jsx";
import UserLogin from "./components/user Login/userLogin.jsx";
import AdminLogin from "./components/adminLogin/AdminLogin";
import UserRegister from "./components/registeration/UserRegister";
import UserDashboard from "./components/Dashboard/user/index.jsx";
import Categories from "components/category/Categories";
import CategoryDetails from "components/category/CategoryDetails";
import BookDetails from "components/bookDetails.jsx";
import Book from "./components/Book";
import BookForm from "./components/BookForm";
import BookAdmin from "./components/bookAdmin";
import DefaultNavbar from "examples/Navbars/DefaultNavbar/index.js";
import MKBox from "components/MKBox";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import AllCategories from "components/category/AllCategories.js";
import AuthorAdminView from "./ourcomponents/AuthorAdminView/AuthorTable.jsx";
import AuthorList from "ourcomponents/AuthorUserView/AuthorList";
import AuthorDetails from "ourcomponents/AuthorUserView/AuthorDetails";
// import { Provider } from "react-redux";
// import categoryStore from "/src/Redux/categoryStore";

export default function App() {
  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route, index) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={index} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      {authToken && role === "user" ? (
        <DefaultNavbar
          className="nav"
          routes={userRoutes}
          action={{
            type: "internal",
            route: "/",
            label: "logout",
            color: "error",
          }}
          sticky
        />
      ) : authToken && role === "admin" ? (
        <DefaultNavbar
          className="nav"
          routes={adminRoutes}
          action={{
            type: "internal",
            route: "/",
            label: "logout",
            color: "error",
          }}
          sticky
        />
      ) : (
        <DefaultNavbar
          className="nav"
          routes={routes}
          action={{
            type: "internal",
            route: "/userLogin",
            component: <UserLogin />,
            label: "login",
            color: "info",
          }}
          sticky
        />
      )}
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Home />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/categories" Component={AllCategories} />
        <Route path="/categories/groups" Component={Categories} />
        <Route path="/categories/:id/books" Component={CategoryDetails} />
        <Route path="/books/:id" Component={BookDetails} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admins" element={<Adminpage />} />
        <Route path="/dashboard/authors" element={<AuthorAdminView />} />
        <Route path="/users/authors" element={<AuthorList />} />
        <Route path="/users/authors/:id/books" element={<AuthorDetails />} />

        <Route path="/user" element={<UserLogin />} />
        <Route path="/users" element={<Userpage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/book" element={<Book />} />
        <Route path="/bookAdmin" element={<BookAdmin />} />
        <Route path="books/:id/edit" element={<BookForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <MKBox mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </ThemeProvider>
  );
}
