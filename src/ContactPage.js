import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { useMediaQuery } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import TabBar from './TabBar';


export default function ContactPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  const isSmallScreenHeight = useMediaQuery('(max-height:800px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:500px)');
  const isSmallScreen = isSmallScreenHeight || isSmallScreenWidth;


  useEffect(() => {
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
      <TabBar isSmallScreen={isSmallScreen} value={3}/>
      <Grid 
          container 
          justify="center" 
          alignItems="center" 
          style={{ 
              height: '60vh',
              maxWidth: '75%',
              margin: '0 auto',
              marginTop: "20vh"
          }}
      >
          <Grid item>
              <Typography style={{ textAlign: 'center', fontSize: isSmallScreen ? 20 : 40 }}>
                  Send us an email at <a href="mailto:glydergames1@gmail.com">glydergames1@gmail.com</a>! We are always looking for feedback on our existing games and suggestions for new ones.
              </Typography>
          </Grid>
      </Grid>
    </div>
  );
}
