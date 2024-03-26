import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import TabBar from "./TabBar";
import { useMediaQuery } from '@material-ui/core';

function PokerGame() {
    return (
        <Typography style={{ fontSize: '24px' }}>
            <br />
            <b>Poker Solitaire</b>
            <br />    
            A single player game about sculpting a poker hand while playing defense against the dealer.
            <br />
            <Button variant="contained" color="primary" component={Link} to="/poker" style={{ color: 'white' }}>
                Try it out!
            </Button>
        </Typography>
    );
}

function MagicGame() {
    return (
        <Typography style={{ fontSize: '24px' }}>
            <br />
            <b>Magic Connections</b>
            <br />
            A game about finding the connections between randomly chosen Magic: the Gathering cards. Warning: hard if you do not have a strong background in Magic.
            <br />
            <Button variant="contained" color="primary" component={Link} to="/magic" style={{ color: 'white' }}>
                Try it out!
            </Button>
        </Typography>
    );
}

function WordLengthGame() {
    return (
        <Typography style={{ fontSize: '24px' }}>
            <br />
            <b>Word Length Racer</b>
            <br />
            A simple speed test for counting how many letters are in words, similar to Type Racer. Mostly made for racing your friends.
            <br />
            <Button variant="contained" color="primary" component={Link} to="/wordlength" style={{ color: 'white' }}>
                Try it out!
            </Button>
        </Typography>
    );

}


export default function ArcadePage() {
    const isSmallScreenHeight = useMediaQuery('(max-height:800px)');
    const isSmallScreenWidth = useMediaQuery('(max-width:500px)');
    const isSmallScreen = isSmallScreenHeight || isSmallScreenWidth;

    return (
        <div
            className="page-container"
            style={{ textAlign: "center", color: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
            <TabBar isSmallScreen={isSmallScreen} value={2}/>
            <h1>Arcade</h1>
            <Typography style={{ alignText: 'center' , fontSize: '24px' }}>
                A collection of small games we've made. Try them out and let us know what you think! 
            </Typography>
            <br />
            <br />
            <PokerGame />
            <br />
            <br />
            <MagicGame />
            <br />
            <br />
            <WordLengthGame />
        </div>
    );
}

