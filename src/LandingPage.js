import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';
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
  

export default function LandingPage() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isSmallScreen = useMediaQuery('(max-height:600px)');

    return (
        <div className="page-container" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100vh',
            color: 'white', 
            overflow: 'hidden', 
            // whiteSpace: 'nowrap' 
        }}>
            {/* Tabs at the top */}
            <Tabs 
              value={value} 
              onChange={handleChange} 
              centered 
              className={classes.tabs} 
              variant="fullWidth" // Ensures tabs take up the full available width
            >
                <Tab label="About Us" component={Link} to="/about" className={classes.tab} />
                <Tab label="Our Games" component={Link} to="/games" className={classes.tab} />
                <Tab label="Contact" component={Link} to="/contact" className={classes.tab} />
            </Tabs>
            
            {/* Title at the top center */}
            <img 
                src="/assets/glyder_games.png" 
                alt="Glyder Games Logo" 
                style={{ 
                    maxHeight: '30vh', // Adjusts to the size of the container
                    marginTop: '5vh' 
                }} 
            />

            {isSmallScreen ? null : <Grid container justify="center" alignItems="center" spacing={5} style={{ height: '60vh', marginTop: "10vh" }}>
                <Grid item>
                    <img
                        src="/assets/drawback_chess_screenshot.png"
                        alt="Drawback Chess"
                        style={{
                            maxHeight: '20vh',
                            maxWidth: '20vh',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                </Grid>
                <Grid item>
                    <img
                        src="/assets/mystery_screenshot.png"
                        alt="Mystery"
                        style={{
                            maxHeight: '20vh',
                            maxWidth: '20vh',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                </Grid>
                <Grid item>
                    <img
                        src="/assets/civlite_screenshot.png"
                        alt="CivLite"
                        style={{
                            maxHeight: '20vh',
                            maxWidth: '20vh',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                </Grid>
                <Grid item>
                    <img
                        src="/assets/shibboleth_screenshot.png"
                        alt="Shibboleth"
                        style={{
                            maxHeight: '20vh',
                            maxWidth: '20vh',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                </Grid>
            </Grid>}        

            {/* Container for the rest of the content */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', // Center alignment for children
                height: '100%', 
                width: '100%' 
            }}>
                {/* <div style={{ height: '5vh' }}></div> */}

                <Typography style={{fontSize: 25, maxWidth: '75%', minWidth: '25%', width: '50vw'}}>
                    We're a small indie game studio based in the Boston area; we're focused on building fun, innovative, and lightweighted games for mobile, web, and Steam.
                    We aim to make simple and novel games that are best played with friends and family.
                </Typography>
            </div>
        </div>
    );
}
