import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import TabBar from "./TabBar";
import { useMediaQuery } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import directionArrowImage from './images/selector_arrow.png';

import './GamesPage.css'

export default function GamesPage() {
  let navigate = useNavigate();
  let oldTitle = document.title;

  const isSmallScreenHeight = useMediaQuery('(max-height:800px)');
  const isSmallScreenWidth = useMediaQuery('(max-width:500px)');
  const isSmallScreen = isSmallScreenHeight || isSmallScreenWidth;

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

  const [gameIndex, setGameIndex] = useState(0);
  const [leftArrowHovered, setLeftArrowHovered] = useState(false);
  const [leftArrowSemiHovered, setLeftArrowSemiHovered] = useState(false);
  
  const [rightArrowHovered, setRightArrowHovered] = useState(false);
  const [rightArrowSemiHovered, setRightArrowSemiHovered] = useState(false);


  const RookeryComponent = () => {
    return (
      <Grid container direction="column" spacing={2} alignItems="center">
        <Typography style={{ fontFamily: 'Pirata One', fontSize: '6vw', color: 'white', textShadow: '0px 0px calc(0.4*var(--vss)) black' }}>
            The Rookery
        </Typography>
        {!isSmallScreen && <Grid item>
          <img src="/assets/lowres_rookery_screenshot.jpg" alt="Rookery screenshot" style={{ maxHeight: "50vh", maxWidth: '60vw', height: "auto" }} />
        </Grid>}        
        <Grid item> 
          <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 16, textAlign: 'center' }}>
            The Rookery is a chess roguelite. Collect powerful items and boosts and field a larger and larger army of chessmen to defeat an increasingly difficult series of opponents.
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 18, textAlign: 'center' }}>
            <b>Wishlist The Rookery now on <a href="https://store.steampowered.com/app/3074200/The_Rookery/?l=english">Steam</a>!</b>
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const ShibbolethComponent = () => {
    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item>
                <img src="/assets/shibboleth.png" alt="Shibboleth" style={{ maxWidth: isSmallScreen ? "80vw" : "20vw", height: "auto" }} />
            </Grid>
            {!isSmallScreen && <Grid item>
                <img src="/assets/lowres_shibboleth_screenshot.jpeg" alt="Shibboleth screenshot" style={{ maxHeight: "50vh", maxWidth: '60vw', height: "auto" }} />
            </Grid>}
            <Grid item>
                <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 16, textAlign: 'center' }}>
                    Shibboleth is a word game in which you must discover who your teammates are by giving clever hints. You and your teammates have a secret, shared word, as do your opponents. 
                    Give clues about your word so your teammates can find you, but be careful — if your opponents discover your word, they can guess your word to steal your victory!
                </Typography>
            </Grid>
            <Grid item>
                <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 18, textAlign: 'center' }}>
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
          <img src="/assets/lowres_drawback_chess_screenshot.jpeg" alt="Drawback Chess" style={{ maxHeight: "50vh", maxWidth: '60vw', height: "auto" }} />
        </Grid>}
        <Grid item>
          <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 16, textAlign: 'center' }}>
            Drawback Chess is a chess variant in which each player has a hidden drawback. You'll be hamstrung by your drawback, but so will your opponent! If you can deduce your opponent's drawback or build towards a position where yours is minimized, you'll gain an advantage over them.
            Some drawbacks are a lot tougher than others, but don't worry—every drawback has its own rating, so you can be sure that you're playing a fair game.
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ maxWidth: isSmallScreen ? '60vw' : '40vw', fontSize: 18, textAlign: 'center' }}>
            <b>Play <a href="https://www.drawbackchess.com/">Drawback Chess</a> now in your browser!{' '}</b>
          </Typography>
        </Grid>
      </Grid>

    )
  }

const GAME_INDEX_TO_COMPONENT = {
  0: <RookeryComponent />,
  1: <ShibbolethComponent />,
  2: <DrawbackChessComponent />
}

const maxGameIndex = Object.keys(GAME_INDEX_TO_COMPONENT).length - 1;

const onDecreaseGameIndex = () => {
  if (gameIndex > 0) {
    setGameIndex(gameIndex - 1);
  }
}

const onIncreaseGameIndex = () => {
  if (gameIndex < maxGameIndex) {
    setGameIndex(gameIndex + 1);
  }
}

const handleLeftArrowMouseOver = () => {
  setLeftArrowHovered(true);
}

const handleLeftArrowMouseLeave = () => {
  setLeftArrowHovered(false);
}

const handleLeftArrowMouseDown = () => {
  setLeftArrowSemiHovered(true);
}

const handleLeftArrowMouseUp = () => {
  setLeftArrowSemiHovered(false);
}

const handleRightArrowMouseOver = () => {
  setRightArrowHovered(true);
}

const handleRightArrowMouseLeave = () => {
  setRightArrowHovered(false);
}

const handleRightArrowMouseDown = () => {
  setRightArrowSemiHovered(true);
}

const handleRightArrowMouseUp = () => {
  setRightArrowSemiHovered(false);
}

console.log('gameIndex', gameIndex);
console.log('GAME_INDEX_TO_COMPONENT[gameIndex]', GAME_INDEX_TO_COMPONENT[gameIndex]);
return (
    <div
        className="page-container"
        style={{ textAlign: "center", color: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}
    >
      <TabBar isSmallScreen={isSmallScreen} value={1}/>
        <Grid container direction="row" justify="center" alignItems="center" spacing={isSmallScreen ? 2 : 10} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <Grid item container direction="column">
                <Grid item container direction="row" justify="center" alignItems="center" spacing={isSmallScreen ? 2 : 10}>
                  <Grid item sx={{ marginRight: '4vw' }}>
                      <img
                          src={directionArrowImage}
                          alt="Direction Arrow"
                          style={{
                              height: '5vw',
                              ...(gameIndex > 0 ? { cursor: 'pointer' } : {}),
                              filter: gameIndex > 0 ? (leftArrowSemiHovered ? 'brightness(1.4)' : (leftArrowHovered ? 'brightness(1.5)' : 'none')) : 'grayscale(100%)',
                          }}
                          onClick={onDecreaseGameIndex}
                          onMouseOver={handleLeftArrowMouseOver}
                          onMouseLeave={handleLeftArrowMouseLeave}
                          onMouseDown={handleLeftArrowMouseDown}
                          onMouseUp={handleLeftArrowMouseUp}
                          draggable={false}
                      />
                    </Grid>
                    <Grid item>
                        {GAME_INDEX_TO_COMPONENT[gameIndex]}
                    </Grid>
                    <Grid item sx={{ marginRight: '4vw' }}>
                        <img
                            src={directionArrowImage}
                            alt="Direction Arrow"
                            style={{
                                height: '5vw',
                                transform: 'scaleX(-1)',
                                ...(gameIndex < maxGameIndex ? { cursor: 'pointer' } : {}),
                                filter: gameIndex < maxGameIndex ? (rightArrowSemiHovered ? 'brightness(1.4)' : (rightArrowHovered ? 'brightness(1.5)' : 'none')) : 'grayscale(100%)',
                            }}
                            onClick={onIncreaseGameIndex}
                            onMouseOver={handleRightArrowMouseOver}
                            onMouseLeave={handleRightArrowMouseLeave}
                            onMouseDown={handleRightArrowMouseDown}
                            onMouseUp={handleRightArrowMouseUp}
                            draggable={false}
                        />
                      </Grid> 
                </Grid>
            </Grid>
        </Grid>
    </div>
);
}
