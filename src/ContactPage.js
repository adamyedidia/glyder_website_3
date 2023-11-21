import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Textfit } from "react-textfit";
import Typography from "@material-ui/core/Typography";

export default function ContactPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  useEffect(() => {
    document.title = "Contact";

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
      <Textfit mode="single" max={60} style={{ width: '80%' }}>
        Send us an email at glydergames1@gmail.com.
      </Textfit>
      <br />
      <Link to="/" style={{ color: "white" }}>
        <Typography variant="h3">Back</Typography>
      </Link>
    </div>
  );
}
