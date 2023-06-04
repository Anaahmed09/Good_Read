// import { Grid } from "@mui/material";
// import Container from "assets/theme/components/container";
// import MKAlert from "components/MKAlert";
// import MKBox from "components/MKBox";
import MKAlert from "components/MKAlert";
import React, { useEffect, useState } from "react";

export default function Userpage() {
  const [flag, setFlag] = useState(false);

  const authToken = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    fetch("http://127.0.0.1:3500/users/", {
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
          console.log(user_id);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div>
      {flag ? (
        <MKAlert color="success">welcom user</MKAlert>
      ) : (
        <MKAlert color="error">no access</MKAlert>
      )}
    </div>
  );
}
