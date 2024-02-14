import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { Tabs, Tab, makeStyles, useMediaQuery } from '@material-ui/core';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  tabs: {
    width: 'min(max(60%, 100vh), 100%)',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1000,
  },
  tab: {
    minWidth: '33.33%', // Divide the width equally among 3 tabs
    fontSize: '1.4rem', // Increase font size for better visibility
  },
}));


export default function ContactPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  const classes = useStyles();
  const [value, setValue] = useState(2);

  const isSmallScreen = useMediaQuery('(max-height:600px)');

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };


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
      <Tabs 
        value={value} 
        onChange={handleChange} 
        centered 
        className={classes.tabs} 
        variant="fullWidth" // Ensures tabs take up the full available width
      >
          <Tab label="About Us" component={Link} to="/" className={classes.tab} />
          <Tab label="Our Games" component={Link} to="/games" className={classes.tab} />
          <Tab label="Contact" component={Link} to="/contact" className={classes.tab} />
      </Tabs>      
      <Grid 
          container 
          justify="center" 
          alignItems="center" 
          style={{ 
              height: '60vh', // Center vertically
              maxWidth: '75%', // Limit width to 75% of the screen
              margin: '0 auto', // Center horizontally
              marginTop: "20vh"
          }}
      >
          <Grid item>
              <Typography style={{ textAlign: 'center', fontSize: isSmallScreen ? 30 : 40 }}>
                  Please send us an email at <a href="mailto:glydergames1@gmail.com">glydergames1@gmail.com</a>! We are always looking for feedback on our existing games and suggestions for new ones. Also, if you are interested in working with us, we will be delighted to hear from you!
              </Typography>
          </Grid>
      </Grid>
    </div>
  );
}
