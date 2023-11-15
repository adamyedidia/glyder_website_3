import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Textfit } from "react-textfit";
import Typography from "@material-ui/core/Typography";

export default function PrivacyPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  useEffect(() => {
    document.title = "Privacy";

    function handleKeyDown(event) {
      if (event.key === "Backspace") {
        navigate("/");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.title = oldTitle;
    };
  }, []);

  return (
    <div
      className="page-container"
      style={{ textAlign: "center", color: "white" , display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
        <br />
      <Textfit mode="double" max={800} style={{ width: '80%' }}>
        Our apps collect no personal data of any kind and do not use any third party services. Users do not provide a password and do not need to sign in. Users do not need to provide an email address or any other personal information.
      </Textfit>
      <br />
      <Link to="/" style={{ color: "white" }}>
        <Typography variant="h3">Back</Typography>
      </Link>
    </div>
  );
}
