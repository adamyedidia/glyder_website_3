import React, { useState, useEffect } from 'react';

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
      fontSize: '1.4rem',
    },
}));
  

export default function LandingPage() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const [clickedImage, setClickedImage] = useState(null);

    useEffect(() => {
        // Preload higher-res images
        const higherResImages = [
            "/assets/mystery_screenshot.png",
            "/assets/civlite_screenshot.png",
            "/assets/drawback_chess_screenshot.png",
            "/assets/shibboleth_screenshot.png"
        ];
        higherResImages.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleImageClick = (index, event) => {
        event.stopPropagation();
        setClickedImage(index);
    };

    const handleOutsideClick = () => {
        console.log("Clicked outside")
        setClickedImage(null);
    };

    const isSmallScreenHeight = useMediaQuery('(max-height:800px)');
    const isSmallScreenWidth = useMediaQuery('(max-width:500px)');
    const isSmallScreen = isSmallScreenHeight || isSmallScreenWidth;

    return (
        <div className="page-container" onClick={handleOutsideClick} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            ...(clickedImage !== null ? {} : {justifyContent: 'center'}),
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
                <Tab label="About Us" component={Link} to="/about" className={classes.tab} style={{ fontSize: isSmallScreen ? '1rem' : '1.4rem' }} />
                <Tab label="Our Games" component={Link} to="/games" className={classes.tab} style={{ fontSize: isSmallScreen ? '1rem' : '1.4rem' }} />
                <Tab label="Contact" component={Link} to="/contact" className={classes.tab} style={{ fontSize: isSmallScreen ? '1rem' : '1.4rem' }}/>
            </Tabs>
            
            {/* Title at the top center */}
            {clickedImage === null && <img 
                src="/assets/glyder_games.png" 
                alt="Glyder Games Logo" 
                style={{ 
                    maxHeight: '30vh',
                    maxWidth: '80vw',
                    marginTop: '5vh' 
                }} 
            />}

            {isSmallScreen ? null : <Grid container justify="center" alignItems="center" spacing={5} style={{ height: '60vh', marginTop: clickedImage !== null ? "0vh" : "5vh", ...(clickedImage !== null ? {position: 'relative'} : {}) }}>
                <Grid container justify="center" alignItems="center" spacing={5}>
                    {["drawback_chess", "mystery", "civlite", "shibboleth"].map((game, index) => (
                        <Grid item key={index}>
                            <a href="#" onClick={(e) => handleImageClick(index, e)}>
                                <img
                                    src={`/assets/lowres_${game}_screenshot.jpeg`}
                                    alt={game}
                                    style={{
                                        maxHeight: '25vh',
                                        maxWidth: '25vh',
                                        borderRadius: '10px',
                                        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.5)',
                                    }}
                                />
                            </a>
                        </Grid>
                    ))}
                </Grid>
            </Grid>}        

            {/* Display higher-res image when clicked */}
            {clickedImage !== null && (
                <img
                    src={`/assets/${["drawback_chess", "mystery", "civlite", "shibboleth"][clickedImage]}_screenshot.png`}
                    alt={["drawback_chess", "mystery", "civlite", "shibboleth"][clickedImage]}
                    style={{ height: '60vh', marginBottom: '5vh', marginTop: '5vh' }}
                />
            )}

            {/* Container for the rest of the content */}
            {clickedImage === null && <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', // Center alignment for children
                height: '100%', 
                width: '100%',
                marginBottom: '10vh'
            }}>
                {/* <div style={{ height: '5vh' }}></div> */}

                <Typography style={{fontSize: isSmallScreen ? 20 : 25, ...(isSmallScreen ? {} : {maxWidth: '75%', minWidth: '25%'}), width: isSmallScreen ? '80vw' : '50vw'}}>
                    We're a small indie game studio based in the Boston area; we're focused on building fun, innovative, and lightweighted games for mobile, web, and Steam.
                    We aim to make simple and novel games that are best played with friends and family.
                </Typography>
            </div>}
        </div>
    );
}
