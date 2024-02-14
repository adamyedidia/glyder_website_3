import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { Tabs, Tab, makeStyles, useMediaQuery } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import './GamesPage.css'


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


export default function GamesPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const isSmallScreen = useMediaQuery('(max-height:600px)');

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

  const ShibbolethComponent = () => {
    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
                <img src="/assets/shibboleth.png" alt="Shibboleth" style={{ maxWidth: isSmallScreen ? "40vw" : "20vw", height: "auto" }} />
            </Grid>
            {!isSmallScreen && <Grid item>
                <img src="/assets/shibboleth_screenshot.png" alt="Shibboleth screenshot" style={{ maxHeight: "50vh", height: "auto" }} />
            </Grid>}
            <Grid item>
                <Typography style={{ maxWidth: isSmallScreen ? '80vw' : '40vw', fontSize: 16, textAlign: 'center' }}>
                    Shibboleth is a word game in which you must discover who your teammates are by giving clever hints. You and your teammates have a shared word, as do your opponents, who have their own shared word. 
                    Give clues about your word so your teammates you're with them. Find your team to win. Be careful, though—if your opponents discover your word, they can guess your word to steal your victory!
                </Typography>
            </Grid>
            <Grid item>
                <Typography style={{ maxWidth: isSmallScreen ? '80vw' : '40vw', fontSize: 20, textAlign: 'center' }}>
                    <b>Play Shibboleth now on <a href="https://play.google.com/store/apps/details?id=glydergames.cipher.ios&hl=en_US&gl=US">Google Play</a>{' '}
                    and{' '}
                    <a href="https://apps.apple.com/us/app/shibboleth/id6472225686">App Store</a>!</b>
                </Typography>
            </Grid>
        </Grid>
    );
  }

  const DrawbackChessComponent = () => {
    return (
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography style={{ fontFamily: 'Bungee Spice', textAlign: 'center', fontSize: isSmallScreen ? '3em' : '5em', marginBottom: '-0.2em', marginTop: '-30px'}}>DRAWBACK CHESS</Typography>
        </Grid>
        {!isSmallScreen && <Grid item>
          <img src="/assets/drawback_chess_screenshot.png" alt="Drawback Chess" style={{ maxHeight: "50vh", height: "auto" }} />
        </Grid>}
        <Grid item>
          <Typography style={{ maxWidth: isSmallScreen ? '80vw' : '40vw', fontSize: 16, textAlign: 'center' }}>
            Drawback Chess is a chess variant in which each player has a hidden drawback. You'll be hamstrung by your drawback, but so will your opponent! If you can deduce your opponent's drawback, you'll gain a powerful advantage over them.
            Some drawbacks are a lot tougher than others, but don't worry—every drawback has its own rating, so you can be sure that you're playing a fair game.
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ maxWidth: isSmallScreen ? '80vw' : '40vw', fontSize: 20, textAlign: 'center' }}>
            <b>Play <a href="https://www.drawbackchess.com/">Drawback Chess</a> now in your browser!{' '}</b>
          </Typography>
        </Grid>
      </Grid>

    )
  }

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
      <Grid container direction="row" justify="center" alignItems="center" spacing={10}>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h2" style={{ marginBottom: "20px" }}>
              Our Games
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="center" spacing={10}>
            <Grid item>
              <ShibbolethComponent />
            </Grid>
            <Grid item>
              <DrawbackChessComponent />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
