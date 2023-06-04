import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";
import MKInput from "../MKInput";
import MKButton from "../MKButton";
import bgImage from "../../assets/images/image.jpg";
import SimpleFooter from "../../examples/Footers/SimpleFooter";
function LoginPage() {
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setRetypePassword] = useState("");
  const [image, setFilename] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
  };
  const handleFilenameChange = (event) => {
    setFilename(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
    const validationErrors = {};
    if (!firstname) {
      validationErrors.firstname = "First name is required";
    }
    if (!lastname) {
      validationErrors.lastname = "Last name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "retype Password !!";
    }
    if (!image) {
      validationErrors.image = "image is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    // const data = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    //   password: password,
    //   confirmPassword: confirmPassword,
    //   image: formData.get("image"),
    // };
    fetch("http://127.0.0.1:3500/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        if (token && data.message) {
          window.alert(data.message);
          localStorage.setItem("authToken", token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("role", data.role);
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
            <Card>
              <MKBox
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Register
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox
                  component="form"
                  role="form"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <MKBox mb={2}>
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      name="firstname"
                      label="First Name"
                      fullWidth
                      value={firstname}
                      onChange={handleFnameChange}
                    />
                  </MKBox>
                  {errors.firstname && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.firstname}
                    </MKTypography>
                  )}
                  <MKBox mb={2}>
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      name="lastname"
                      label="Last Name"
                      fullWidth
                      value={lastname}
                      onChange={handleLnameChange}
                    />
                  </MKBox>
                  {errors.lastname && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.lastname}
                    </MKTypography>
                  )}
                  <MKBox mb={2} mt={2}>
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="email"
                      name="email"
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </MKBox>
                  {errors.email && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.email}
                    </MKTypography>
                  )}
                  <MKBox mb={2} mt={2}>
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      name="password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </MKBox>
                  {errors.password && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.password}
                    </MKTypography>
                  )}
                  <MKBox mb={2} mt={2}>
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      type="password"
                      name="confirmPassword"
                      label="Retype Password"
                      fullWidth
                      value={confirmPassword}
                      onChange={handleRetypePasswordChange}
                    />
                  </MKBox>
                  {errors.confirmPassword && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.confirmPassword}
                    </MKTypography>
                  )}
                  <MKBox mb={2} mt={2}>
                    {/* <MKTypography variant="subtitle2" fontWeight="light" color="dark" mt={1}>
                      upload image
                    </MKTypography> */}
                    <MKInput
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                      label="Upload Image"
                      type="file"
                      name="image"
                      fullWidth
                      // value={image}
                      id="fileInput"
                      onChange={handleFilenameChange}
                    />
                  </MKBox>
                  {errors.image && (
                    <MKTypography className="text-danger" variant="inherit">
                      {errors.image}
                    </MKTypography>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="dark" fullWidth type="submit">
                      submit
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
