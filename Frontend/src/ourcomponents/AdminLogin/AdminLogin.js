import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKInput from "../../components/MKInput";
import MKButton from "../../components/MKButton";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import SimpleFooter from "../../examples/Footers/SimpleFooter";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!username) {
      validationErrors.username = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      email: username,
      password: password,
    };
    fetch("http://127.0.0.1:3500/Adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        if (token && data.message) {
          window.alert(data.message);
          localStorage.setItem("authToken", token);
          localStorage.setItem("user_id", data.admin_id);
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          }
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <MKTypography variant="h3" mb={6} color="white" width="100%">
              Welcome To Admin Panel
            </MKTypography>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      fullWidth
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </MKBox>
                  {errors.username && <p className="text-danger fs-6"> {errors.username}</p>}
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </MKBox>
                  {errors.password && <p className="text-danger fs-6"> {errors.password}</p>}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="dark" fullWidth type="submit">
                      sign in
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default LoginPage;
