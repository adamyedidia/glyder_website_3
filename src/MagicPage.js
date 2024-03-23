import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fetchWrapper } from './Helpers'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

let URL = 'http://5.161.227.62:5031'

function newGame(setGame) {
    fetchWrapper(URL + '/new_game', {}, 'GET')
        .then((response) => {
            setGame(response);
        })
}

function MagicCard({ card, visibility, dimensions, index, selected, setSelected, completed }) {
    const backgroundColor = completed.includes(index) ? 'green' : selected.includes(index) ? 'blue' : 'black';
    
    const fontSize = Math.min(dimensions.width, dimensions.height) / 20;
    
    const onClick = () => {
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
        <div onClick={onClick} style={{ color: 'white', width: dimensions.width, height: dimensions.height, backgroundColor, padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography style={{ fontSize: fontSize * 0.8 }}>{card.name}</Typography>
                {visibility.manaCost && <Typography style={{ fontSize: fontSize * 0.8 }}>{card.manaCost}</Typography>}
            </div>
            {visibility.type && <Typography style={{ fontSize , marginBottom: '10px' }}>{card.type}</Typography>}
            {visibility.rulesText && card.text && card.text.map((text, i) => <Typography key={i} style={{ fontSize }}>{text}</Typography>)}
            {visibility.rulesText && <Typography style={{ fontSize }}>{card.text}</Typography>}
            {visibility.powerAndToughness && <Typography style={{ fontSize }}>{card.powerAndToughness}</Typography>}
            <div style={{ marginTop: '10px' , display: 'flex', flexDirection: 'row' }}>
                {visibility.set && <Typography style={{ fontSize }}>{card.set}</Typography>}
                {visibility.set && visibility.rarity && <Typography style={{ fontSize, marginLeft: '5px', marginRight: '5px' }}> - </Typography>}
                {visibility.rarity && <Typography style={{ fontSize }}>{card.rarity}</Typography>}
            </div>
            {visibility.flavorText && <Typography style={{ fontSize, fontStyle: 'italic', marginTop: '10px' , alignSelf: 'bottom' }}>{card.flavor_text}</Typography>}
        </div>
    );
}


function CardRow({ cards, startingIndex, visibilities, dimensions , selected, setSelected, completed}) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <MagicCard card={cards[0]} index={startingIndex} visibility={visibilities[0]} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <MagicCard card={cards[1]} index={startingIndex + 1} visibility={visibilities[1]} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <MagicCard card={cards[2]} index={startingIndex + 2} visibility={visibilities[2]} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <MagicCard card={cards[3]} index={startingIndex + 3} visibility={visibilities[3]} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
        </Grid>
    )
}

function CardGrid({ cards, visibilities, dimensions , selected, setSelected, completed}) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <CardRow cards={cards.slice(0, 4)} startingIndex={0} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <CardRow cards={cards.slice(4, 8)} startingIndex={4} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <CardRow cards={cards.slice(8, 12)} startingIndex={8} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
            <Grid item xs={6}>
                <CardRow cards={cards.slice(12, 16)} startingIndex={12} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
            </Grid>
        </Grid>
    )
}

function Buttons({ setGame }) {
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Button color="primary" variant="contained" component={Link} to="/arcade">Back to Arcade</Button>
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={() => newGame(setGame)}>New Game</Button>
            </Grid>
        </Grid>
    )
}

function cardDimensions(windowWidth, windowHeight) {
    let width = Math.max(windowWidth / 5, 100);
    let height = Math.max(windowHeight / 5, 200);

    return {
        width: width,
        height: height
    }
}

export default function MagicPage() {
    let [game, setGame] = useState(null);
    let [points, setPoints] = useState(100);
    let [selected, setSelected] = useState([]);
    let [completed, setCompleted] = useState([]);
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

    useEffect(() => {
        newGame(setGame);
    }, [])

    function visibility() {
        return {
            'rulesText': true,
            'manaCost': true,
            'powerAndToughness': true,
            'type': true,
            'set': true,
            'rarity': true,
            'flavorText': true
        }
    }

    let visibilities = {
        0: visibility(),
        1: visibility(),
        2: visibility(),
        3: visibility(),
        4: visibility(),
        5: visibility(),
        6: visibility(),
        7: visibility(),
        8: visibility(),
        9: visibility(),
        10: visibility(),
        11: visibility(),
        12: visibility(),
        13: visibility(),
        14: visibility(),
        15: visibility(),
    }

    if (!game) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    let cards = [];

    for (let key of Object.keys(game.data)) {
        game.data[key].forEach(card => {
            cards.push(card);
        })
    }

    cards = cards.sort((card) => card.name);

    console.log(cards);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                <Buttons setGame={setGame} />
            </div>
            <CardGrid cards={cards} visibilities={visibilities} dimensions={dimensions} selected={selected} setSelected={setSelected} completed={completed}/>
         </div>
    )
}