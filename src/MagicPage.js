import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fetchWrapper } from './Helpers'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

let URL = 'https://glydergames.com/magic/app'

function newGame(setGame, refresh) {
   fetchWrapper(URL + '/new_game', {}, 'GET')
        .then((response) => {
            setGame(response);
            refresh();
        })
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function HowToPlayDialog({ open, handleClose }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                style: { backgroundColor: 'black', minWidth: '50%' },
            }}>
                <DialogTitle style={{ color: 'white' }}>How to play</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: 'white' }}>
                        <p> If you're familiar with the New York Times connections game, the rules are quite similar. </p>
                        <p> Each game, there are four categories chosen at random. You can see what they are based on the buttons at the top of the screen that say things like 'Rarity' or 'CMC'. </p>
                        <p> For each category, there are exactly four cards that match perfectly. Each card belongs to exactly one such set. You win when you correctly submit 3 out of the 4 sets (since the last one is trivial at that point). </p>
                        <p> You can purchase various facts about the cards by clicking the buttons that say things like 'Rules Text - 3' and 'Mana Cost - 3' and then clicking on a card. The point cost comes after the hyphen. </p>
                        <p> You can submit a guess for a four card set by clicking on four cards and then clicking the button corresponding to the property you think they share. Corret guesses are free and incorrect guesses cost 5 points. </p>
                        <p> Matches must always be exactly. For example, 'Artifact Creature', 'Legendary Creature', and 'Creature' are not the same type for the purposes of type, and 'Human Warrior' and 'Human' are not the same for the purposes of subtype. A creature with a toughness of * is different than one with a toughness of 0. 'Type' is everything before the hyphen, and subtype is everything after. </p>
                        <p> Each category has a single correct answer - for example, if 'Rarity' is a category, there is exactly one rarity that has exactly 4 cards that match it. If there is a rarity with 5 cards that match it, it cannot be that a subset of those 5 cards is the correct rarity. </p>
                        <p> Once you get the hang of it, I recommend playing with a timer. </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: 'white' }} onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

let symbols = {
    '{W}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/white.png" alt="White" />,
    '{U}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/blue.png" alt="Blue" />,
    '{B}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/black.png" alt="Black" />,
    '{R}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/red.png" alt="Red" />,
    '{G}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/green.png" alt="Green" />,
    '{C}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/colorless.png" alt="Colorless" />,
    '{0}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/0.png" alt="0 mana" />,
    '{1}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/1.png" alt="1 mana" />,
    '{2}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2.png" alt="2 mana" />,
    '{3}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/3.png" alt="3 mana" />,
    '{4}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/4.png" alt="4 mana" />,
    '{5}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/5.png" alt="5 mana" />,
    '{6}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/6.png" alt="6 mana" />,
    '{7}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/7.png" alt="7 mana" />,
    '{8}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/8.png" alt="8 mana" />,
    '{9}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/9.png" alt="9 mana" />,
    '{10}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/10.png" alt="10 mana" />,
    '{11}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/11.png" alt="11 mana" />,
    '{12}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/12.png" alt="12 mana" />,
    '{13}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/13.png" alt="13 mana" />,
    '{14}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/14.png" alt="14 mana" />,
    '{15}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/15.png" alt="15 mana" />,
    '{16}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/16.png" alt="16 mana" />,
    '{17}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/17.png" alt="17 mana" />,
    '{18}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/18.png" alt="18 mana" />,
    '{19}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/19.png" alt="19 mana" />,
    '{20}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/20.png" alt="20 mana" />,
    '{T}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/tap.png" alt="Tap" />,
    '{Q}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/untap.png" alt="Untap" />,
    '{S}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/snow.png" alt="Snow mana" />,
    '{E}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/energy.png" alt="Energy" />,
    '{X}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/x.png" alt="X mana" />,
    '{2/U}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2U.png" alt="2/U" />,
    '{2/B}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2B.png" alt="2/B" />,
    '{2/R}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2R.png" alt="2/R" />,
    '{2/G}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2G.png" alt="2/G" />,
    '{2/W}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/2W.png" alt="2/W" />,
    '{B/G}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/BG.png" alt="B/G" />,
    '{B/R}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/BR.png" alt="B/R" />,
    '{G/U}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/GU.png" alt="G/U" />,
    '{G/W}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/GW.png" alt="G/W" />,
    '{R/G}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/RG.png" alt="R/G" />,
    '{R/W}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/RW.png" alt="R/W" />,
    '{U/B}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/UB.png" alt="U/B" />,
    '{U/R}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/UR.png" alt="U/R" />,
    '{W/B}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/WB.png" alt="W/B" />,
    '{W/U}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/WU.png" alt="W/U" />,
    '{W/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/WP.png" alt="W/P" />,
    '{U/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/UP.png" alt="U/P" />,
    '{B/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/BP.png" alt="B/P" />,
    '{R/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/RP.png" alt="R/P" />,
    '{G/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/GP.png" alt="G/P" />,
    '{B/R/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/BRP.png" alt="BR/P" />,
    '{U/B/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/UBP.png" alt="UB/P" />,
    '{W/B/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/WBP.png" alt="W/B/P" />,
    '{W/U/P}': (size) => <img style={{ verticalAlign: 'middle' }} width={size} height={size} src="/assets/mana_symbols/WUP.png" alt="W/U/P" />,
}

function EnrichedText({ text, style }) {
    // add a space between tap symbols and commas
    text = text.replace(/{T},/g, '{T} ,');
    let parts = text.match(/({[^}]+})|\s+|[^\s{}]+/g);

    if (!parts) {
        return <div></div>;
    }

    let elements = parts.map((part, i) => {
        if (part in symbols) {
            return <span key={i}>{symbols[part](style.fontSize)}</span>;
        } else {
            return <span key={i}>{part}</span>
        }
    })

    return (
        <div style={{ ...style, lineHeight: 1 }}>
            {elements}
        </div>
    )
}



function MagicCard({ card, visibilities, dimensions, flashingRed, index, selected, setSelected, completed, purchase, purchasing }) {
     let visibility = completed.includes(index) ? {
        'rulesText': true,
        'manaCost': true,
        'powerAndToughness': true,
        'type': true,
        'set': true,
        'rarity': true,
        'flavorText': true
    } : visibilities[index];

   const backgroundColor = flashingRed.includes(index) ? 'red' : completed.includes(index) ? 'darkgreen' : selected.includes(index) ? 'rgba(50, 50, 150, 1)' : purchasing && !visibility[purchasing] ? 'green' : 'purple';

    const fontSize = Math.min(dimensions.width, dimensions.height * 1.2) / 15;

    const nameFontSize = Math.min(fontSize * 2, dimensions.width / (card.name.length + card.mana_cost.length) * 2);

    const onClick = () => {
        if (purchase(index)) {
            return;
        }
        if (completed.includes(index)) {
            return;
        }
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    return (
        <div onClick={onClick} style={{ color: 'white', width: dimensions.width, minHeight: dimensions.height, height: '100%', flexGrow: 1, backgroundColor, display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography style={{ fontSize: nameFontSize, fontWeight: 'bold' }}>{card.name}</Typography>
                {visibility.manaCost && <EnrichedText text={card.mana_cost || 'None'} style={{ fontSize: nameFontSize, justifyContent: 'center', alignItems: 'center', textAlign: 'center', textJustify: 'center', display: card.mana_cost ? null : 'flex' }} />}
            </div>
            <Typography style={{ opacity: visibility.type ? 1 : 0, fontSize: fontSize * 1.2, marginBottom: '10px' }}>{card.type}</Typography>
            <div style={{ marginBottom: '10px', opacity: visibility.rulesText ? 1 : 0 }}>
                <Grid container direction="column" spacing={1}>
                    {(card.text.length === 0 ? ['This card has no rules text.'] : card.text).map((text, i) =>
                        <Grid item>
                            <EnrichedText key={i} text={text} style={{ fontSize }} />
                        </Grid>
                    )}
                </Grid>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                <Typography title={card.set_name} style={{ fontSize, opacity: visibility.set ? 1 : 0 }}>{card.set}</Typography>
                <Typography style={{ fontSize, opacity: visibility.rarity ? 1 : 0, marginLeft: '5px', marginRight: '5px' }}> - </Typography>
                <Typography style={{ fontSize, opacity: visibility.rarity ? 1 : 0 }}>{card.rarity}</Typography>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography style={{ fontSize, fontStyle: 'italic', marginRight: '10px', flexGrow: 1, opacity: visibility.flavorText ? 1 : 0 }}>{card.flavor_text || "This card has no flavor text."}</Typography>
                <Typography style={{ fontSize: fontSize * 1.3, fontWeight: 'bold', border: '1px solid white', borderRadius: '5px', padding: '4px', whiteSpace: 'no-wrap', alignSelf: 'flex-end', opacity: visibility.powerAndToughness ? 1 : 0 }}>
                    {card.power || card.toughness ? card.power + "/" + card.toughness : 'N/A'}
                </Typography>
            </div>
        </div>
    );
}


function CardRow({ cards, startingIndex, visibilities, dimensions, selected, setSelected, completed, purchase , purchasing, flashingRed }) {
    return (
        <Grid container spacing={3} direction="row" alignItems="stretch">
            <Grid item xs={3}>
                <MagicCard flashingRed={flashingRed} card={cards[0]} index={startingIndex} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
            <Grid item xs={3}>
                <MagicCard flashingRed={flashingRed} card={cards[1]} index={startingIndex + 1} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
            <Grid item xs={3}>
                <MagicCard flashingRed={flashingRed} card={cards[2]} index={startingIndex + 2} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
            <Grid item xs={3}>
                <MagicCard flashingRed={flashingRed} card={cards[3]} index={startingIndex + 3} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing}/>
            </Grid>
        </Grid>
    )
}

function CardGrid({ cards, visibilities, dimensions, selected, setSelected, completed, purchase , flashingRed, purchasing }) {
    return (
        <Grid container spacing={6} direction="column">
            <Grid item xs={12}>
                <CardRow flashingRed={flashingRed} cards={cards.slice(0, 4)} startingIndex={0} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
            <Grid item xs={12}>
                <CardRow flashingRed={flashingRed} cards={cards.slice(4, 8)} startingIndex={4} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />   
            </Grid>
            <Grid item xs={12}>
                <CardRow flashingRed={flashingRed} cards={cards.slice(8, 12)} startingIndex={8} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
            <Grid item xs={12}>
                <CardRow flashingRed={flashingRed} cards={cards.slice(12, 16)} startingIndex={12} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing} />
            </Grid>
        </Grid>
    )
}

function Buttons({ game, setGame, showHotkeys, setShowHotkeys, selected, setSelected, refresh, submit, costs, costDescriptions, purchasing, setPurchasing, completedCategories, setHowToPlayOpen }) {
    function buttonStyle(disabled) {
        return {
            backgroundColor: disabled ? 'red' : null,
            color: 'white'
        }
    }

    function adjustHotkeyDescription(description) {
        if (showHotkeys) {
            return description;
        } else {
            return description.replace(/\s\(\w\)/, '');
        }
    }

    return (
        <Grid container spacing={1} direction="column" style={{ alignItems: 'center' }}>
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button color="primary" variant="contained" component={Link} to="/arcade">Back to Arcade</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => setHowToPlayOpen(true)}>How to Play</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => newGame(setGame, refresh)}>New Game</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => setShowHotkeys(!showHotkeys)}>{showHotkeys ? 'Hide' : 'Show'} Hotkeys</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item>
                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', color: 'white' }}>
                            Categories:
                        </div>
                    </Grid>
                    {Object.keys(game.data).map((category) =>
                        <Grid item>
                            <Button disabled={completedCategories.includes(category) || selected.length != 4} style={completedCategories.includes(category) ? { color: 'white', backgroundColor: 'green' } : buttonStyle(selected.length != 4)} color="primary" variant="contained" onClick={() => submit(category)}>{category}</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1}>
                    {Object.keys(costs).map((key) =>
                        <Grid item>
                            <Button style={{ backgroundColor: purchasing === key ? 'green' : null }} color="primary" variant="contained" onClick={() => { setSelected([]); setPurchasing(key === purchasing ? null : key)}}>{adjustHotkeyDescription(costDescriptions[key])}</Button>
                        </Grid>
                    )}
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => setPurchasing(null)}>{adjustHotkeyDescription("Cancel (C)")}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function Header({ points, finished }) {
    let pointColor = points >= 80 ? 'green' : points >= 50 ? 'yellow' : 'red';

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="h4" style={{ color: 'white' }}>
                {finished ? "Final Score" : "Current Points"}:
            </Typography>
            <Typography variant="h4" style={{ color: pointColor, marginLeft: '5px' }}>
                {points}
            </Typography>
        </div>
    )
}

function cardDimensions(windowWidth, windowHeight) {
    let width = Math.max(windowWidth / 5, 100);
    let height = Math.max((windowHeight - 200) / 7, 150);

    return {
        width: width,
        height: height
    }
}

export default function MagicPage() {
    let [howToPlayOpen, setHowToPlayOpen] = useState(false);
    let [game, setGame] = useState(null);
    let [points, setPoints] = useState(100);
    let [selected, setSelected] = useState([]);
    let [completed, setCompleted] = useState([]);
    let [completedCategories, setCompletedCategories] = useState([]);
    let [purchasing, setPurchasing] = useState(false);
    let [showHotkeys, setShowHotkeys] = useState(false);
    let [flashingRed, setFlashingRed] = useState([]);
    let [dimensions, setDimensions] = useState(cardDimensions(window.innerWidth, window.innerHeight));

    useEffect(() => {
        function handleResize() {
            setDimensions(cardDimensions(window.innerWidth, window.innerHeight));
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        document.body.classList.add('game');

        return () => {
            document.body.classList.remove('game');
        }
    }, [])

    function freshVisibilities(bool) {
        return {
            0: visibility(bool),
            1: visibility(bool),
            2: visibility(bool),
            3: visibility(bool),
            4: visibility(bool),
            5: visibility(bool),
            6: visibility(bool),
            7: visibility(bool),
            8: visibility(bool),
            9: visibility(bool),
            10: visibility(bool),
            11: visibility(bool),
            12: visibility(bool),
            13: visibility(bool),
            14: visibility(bool),
            15: visibility(bool),
        }
    }

    let [visibilities, setVisibilities] = useState(freshVisibilities());

    function refresh() {
        setPoints(100);
        setSelected([]);
        setCompleted([]);
        setCompletedCategories([]);
        setPurchasing(null);
        setVisibilities(freshVisibilities());
    }

    useEffect(() => {
       newGame(setGame, refresh);
    }, [])

    function visibility(bool) {
        return {
            'rulesText': bool,
            'manaCost': bool,
            'powerAndToughness': bool,
            'type': bool,
            'set': bool,
            'rarity': bool,
            'flavorText': bool
        }
    }

    let costs = {
        'rulesText': 3,
        'manaCost': 3,
        'powerAndToughness': 3,
        'type': 2,
        'set': 2,
        'rarity': 2,
        'flavorText': 1
    }

    let costDescriptions = {
        'rulesText': 'Rules Text - 3 (R)',
        'manaCost': 'Mana Cost - 3 (M)',
        'powerAndToughness': 'Power and Toughness - 3 (P)',
        'type': 'Type - 2 (T)',
        'set': 'Set - 2 (S)',
        'rarity': 'Rarity - 2 (Y)',
        'flavorText': 'Flavor Text - 1 (F)'
    }

    let costHotkeys = {
        'r': 'rulesText',
        'm': 'manaCost',
        'p': 'powerAndToughness',
        't': 'type',
        's': 'set',
        'y': 'rarity',
        'f': 'flavorText'
    }

    useEffect(() => {
        if (!localStorage.getItem('magic')) {
            setHowToPlayOpen(true);
        }
    }, [])


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey) {
                return;
            }
            if (event.key.toLowerCase() in costHotkeys) {
                if (purchasing === costHotkeys[event.key.toLowerCase()]) {
                    setPurchasing(null);
                } else {
                    setPurchasing(costHotkeys[event.key.toLowerCase()]);
                }
            } else if (event.key.toLowerCase() === 'c') {
                setPurchasing(null);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [purchasing])

    if (!game) {
        return (
            <h1>
                Loading...
            </h1>
        )
    }

    let cards = [];

    let allCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    let allCategories = Object.keys(game.data);

    for (let key of Object.keys(game.data)) {
        game.data[key].forEach(card => {
            cards.push(card);
        })
    }

    cards.sort((a, b) => a.name.localeCompare(b.name));

    function indexOfCardName(card) {
        return cards.findIndex((c) => c.name === card.name);
    }

    function submit(category) {
        if (selected.length != 4) {
            return;
        }
        if (!Object.keys(game.data).includes(category)) {
            return;
        }
        if (game.data[category].every((card) => selected.includes(indexOfCardName(card)))) {
            if (completed.length === 8) {
                setCompleted(allCards);
                setCompletedCategories(allCategories);
                setSelected([]);
                return;
            } else {
                setCompleted([...completed, ...selected]);
                setCompletedCategories([...completedCategories, category]);
                setSelected([]);
            }
            return;
        } else {
            setPoints(points - 5);
            setFlashingRed([...selected]);
            setTimeout(() => {
                setFlashingRed([]);
            }, 1000);
        }
    }

    function purchase(index) {
        if (!purchasing) {
            return false;
        }
        if (completed.includes(index) || visibilities[index][purchasing]) {
            return true;
        }
        setPurchasing(null);
        setVisibilities({ ...visibilities, [index]: { ...visibilities[index], [purchasing]: true } });
        setPoints(points - costs[purchasing]);
        return true
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                <Buttons game={game} setGame={setGame} showHotkeys={showHotkeys} setShowHotkeys={setShowHotkeys} selected={selected} setSelected={setSelected} refresh={refresh} submit={submit} completedCategories={completedCategories} costs={costs} costDescriptions={costDescriptions} purchasing={purchasing} setPurchasing={setPurchasing} setHowToPlayOpen={setHowToPlayOpen}/>
            </div>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                <Header game={game} points={points} finished={completed.length === 16} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardGrid cards={cards} visibilities={visibilities} dimensions={dimensions} flashingRed={flashingRed} selected={selected} setSelected={setSelected} completed={completed} purchase={purchase} purchasing={purchasing}/>
            </div>
            <HowToPlayDialog open={howToPlayOpen} handleClose={() => setHowToPlayOpen(false)} />
        </div>
    )
}