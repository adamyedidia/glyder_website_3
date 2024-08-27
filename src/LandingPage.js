import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TabBar from './TabBar';
import { useMediaQuery } from '@material-ui/core';


export default function LandingPage() {
    const [clickedImage, setClickedImage] = useState(null);

    // useEffect(() => {
    //     // Preload higher-res images
    //     const higherResImages = [
    //         "/assets/mystery_screenshot.png",
    //         "/assets/civlite_screenshot.png",
    //         "/assets/drawback_chess_screenshot.png",
    //         "/assets/shibboleth_screenshot.png"
    //     ];
    //     higherResImages.forEach((image) => {
    //         const img = new Image();
    //         img.src = image;
    //     });
    // }, []);

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
    const isSmallScreen = isSmallScreenHeight || isSmallScreenWidth || true;

    const clickedImageToLowresScreenshotPath = (index) => {
        const titleList = ["drawback_chess", "rookery", "civlite", "shibboleth"];
        if (titleList[index] === "rookery") {
            return `/assets/lowres_${titleList[index]}_screenshot.jpg`;
        }
        return `/assets/lowres_${titleList[index]}_screenshot.jpeg`;
    }

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
            <TabBar isSmallScreen={isSmallScreen} value={0}/>
            {clickedImage === null && <img 
                src="/assets/glyder_games.png" 
                alt="Glyder Games Logo" 
                style={{ 
                    maxHeight: '20vh',
                    maxWidth: '80vw',
                    marginTop: '5vh',
                    border: '4px solid white',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: 'black',
                }} 
            />}

            {isSmallScreen ? null : <Grid container justify="center" alignItems="center" spacing={5} style={{ height: '60vh', marginTop: clickedImage !== null ? "0vh" : "5vh", ...(clickedImage !== null ? {position: 'relative'} : {}) }}>
                <Grid container justify="center" alignItems="center" spacing={5}>
                    {["drawback_chess", "rookery", "civlite", "shibboleth"].map((game, index) => (
                        <Grid item key={index}>
                            <a href="#" onClick={(e) => handleImageClick(index, e)}>
                                <img
                                    src={clickedImageToLowresScreenshotPath(index)}
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
                    src={clickedImageToLowresScreenshotPath(clickedImage)}
                    alt={["drawback_chess", "rookery", "civlite", "shibboleth"][clickedImage]}
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
                    We're a small indie game studio based in the Boston area. We're focused on building fun, innovative, lightweight games for mobile, web, and Steam.
                    We aim to make simple and novel games that are best played with friends and family.
                </Typography>
            </div>}
        </div>
    );
}
