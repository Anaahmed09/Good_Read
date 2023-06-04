// import { Grid } from "@mui/material";
// import Container from "assets/theme/components/container";
// import MKAlert from "components/MKAlert";
// import MKBox from "components/MKBox";
import MKAlert from "components/MKAlert";
import React, { useEffect, useState } from "react";
function Adminpage() {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const admin_id = localStorage.getItem("admin_id");
    fetch("http://127.0.0.1:3500/admins/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          setFlag(!flag);
          console.log(admin_id);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div>
      {flag ? (
        <MKAlert color="success">welcome admin</MKAlert>
      ) : (
        <MKAlert color="error">no access</MKAlert>
      )}
    </div>
  );
}
export default Adminpage;
