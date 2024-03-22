import React, { useState, useEffect } from 'react'
import { fetchWrapper } from './Helpers'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

let URL = 'http://5.161.227.62:5030'

let symbols = {
    'D': '♦',
    'H': '♥',
    'C': '♣',
    'S': '♠',
}

let colors = {
    'D': 'purple',
    'H': 'red',
    'C': 'teal',
    'S': 'black',
}

let cardStyle = {
    border: '1px solid white',
    boxSizing: 'border-box',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '3px',
}

function freshGame() {
    return {
        'dealerCards': [],
        'playerCards': [],
        'dealerBestHand': [],
    }
}

function newGame(setGameId, setGame, setSelectedCards) {
    fetchWrapper(URL + '/new_game', {}, 'POST')
        .then(data => {
            if (!data.success) {
                console.log(data.error)
                return
            }
            setGameId(data.gameId)
            setGame(freshGame())
            setSelectedCards([])
        })
}

function HowToPlayDialog({ open, handleClose }) {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>How to play</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Click on cards to select them. Click "Deal" to see the dealer's cards and the best hand for the dealer.</p>
                        <p>Click "New Game" to start a new game.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function Card({ suit, rank, dimensions, background, border }) {
    if (suit === '' || rank === '') {
        return (
            <div style={{ ...cardStyle, width: dimensions.width, height: dimensions.height, border: '1px solid ' + (border || 'green') }}>

            </div>
        )
    }
    let fontSize = dimensions.width / 2.5

    return (
        <div style={{ ...cardStyle, fontSize, width: dimensions.width, height: dimensions.height, backgroundColor: background || colors[suit] }}>
            {rank} {symbols[suit]}
        </div>
    )
}

function ClickableCard({ suit, rank, dimensions, background, selectedCards, setSelectedCards }) {
    let onClick = () => {
        if (selectedCards.filter(card => card.suit === suit && card.rank === rank).length > 0) {
            setSelectedCards(selectedCards.filter(card => card.suit !== suit || card.rank !== rank))
        } else {
            setSelectedCards([...selectedCards, { suit, rank }])
        }
    }

    return (
        <div onClick={onClick}>
            <Card suit={suit} rank={rank} dimensions={dimensions} background={background} />
        </div>
    )
}

let suits = ['D', 'H', 'C', 'S']
let ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']

let name_to_rank = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    '10': 10,
    '9':  9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
}

let rank_to_name = {
    14: 'A',
    13: 'K',
    12: 'Q',
    11: 'J',
    10: '10',
    9: '9',
    8: '8',
    7: '7',
    6: '6',
    5: '5',
    4: '4',
    3: '3',
    2: '2',
}

function rank(r) {
    return [
        { suit: 'D', rank: r },
        { suit: 'H', rank: r },
        { suit: 'C', rank: r },
        { suit: 'S', rank: r },
    ]
}

function suit(s) {
    return [
        { suit: s, rank: 'A' },
        { suit: s, rank: 'K' },
        { suit: s, rank: 'Q' },
        { suit: s, rank: 'J' },
        { suit: s, rank: '10' },
        { suit: s, rank: '9' },
        { suit: s, rank: '8' },
        { suit: s, rank: '7' },
        { suit: s, rank: '6' },
        { suit: s, rank: '5' },
        { suit: s, rank: '4' },
        { suit: s, rank: '3' },
        { suit: s, rank: '2' },
    ]
}

let hotkey_map = {
    'a': rank('A'),
    'k': rank('K'),
    'q': rank('Q'),
    'j': rank('J'),
    't': rank('10'),
    '0': rank('10'),
    '9': rank('9'),
    '8': rank('8'),
    '7': rank('7'),
    '6': rank('6'),
    '5': rank('5'),
    '4': rank('4'),
    '3': rank('3'),
    '2': rank('2'),
    'd': suit('D'),
    'h': suit('H'),
    'c': suit('C'),
    's': suit('S'), 
}

function PlayerCards({ cards, cardDimensions, dealerBestHand, dealerHandDescription, isDealer }) {
    if (!cards) {
        return null
    }

    while (cards.length < (isDealer ? 8 : 5)) {
        cards.push({ suit: '', rank: '' });
    }

    const chunkArray = (array, size) => {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
            let chunk = array.slice(i, i + size);
            result.push(chunk);
        }
        return result;
    };

    const rows = chunkArray(cards, isDealer ? 13 : 5);

    return (
        <div style={{ marginLeft: '5px' , textAlign: 'center' }}>
            {isDealer ? <h3 style={{ color: 'white' }}>Dealer {dealerHandDescription ? "(" + dealerHandDescription + ")" : ""} </h3> : <h3 style={{ color: 'white' }}>Player</h3>}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="card-row" style={{ display: 'flex', marginBottom: '10px' }}>
                    {row.map((card, cardIndex) => (
                        <Card key={cardIndex} dimensions={cardDimensions} suit={card.suit} rank={rank_to_name[card.rank]} border={isDealer ? 'red' : 'green' } background={isDealer && dealerBestHand.filter(c => c.suit === card.suit && c.rank === card.rank).length > 0 ? 'green' : null}/>
                    ))}
                </div>
            ))}
        </div>
    );
}

function CardGrid({ selectedCards, setSelectedCards, cardDimensions, calculateBackground }) {
    return (
        <Grid container style={{ alignContent: 'center' }}>
            {ranks.map(rank => (
                <Grid item key={rank}>
                    {suits.map(suit => (
                        <ClickableCard key={suit} suit={suit} rank={rank} dimensions={cardDimensions} background={calculateBackground(suit, rank)} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}

function dealCard({ gameId, selectedCards, setGame }) {
    let rule = selectedCards.map(card => name_to_rank[card.rank] + card.suit).join(' ')

    fetchWrapper(URL + "/deal", { gameId, rule }, 'POST')
        .then(data => {
            if (data.success) {
                setGame(data)
            } else {
                console.log(data.error)
            }
        })
}

function cardDimensions(windowWidth, windowHeight) {
    let width = (windowWidth - 50) / 15;
    let height = Math.min(width * 1.5, windowHeight / 10);
    return { width, height }
}

function expectedDealerCardsText(game, selectedCards) {
    if (!game) {
        return ""
    }
    let cardsRemaining = 52 - (game.dealerCards.filter(card => card.suit !== '' && card.rank !== '').length + game.playerCards.filter(card => card.suit !== '' && card.rank !== '').length)
    let numSelected = selectedCards.length
    let expected = (numSelected + cardsRemaining + 1) / (numSelected + 1) - 1
    let formattedExpected = expected === parseInt(expected) ? expected : expected.toFixed(1)
    return numSelected ? " (" + formattedExpected + ")" : ""
}

function Buttons({ gameId, setGameId, game, setGame, selectedCards, setSelectedCards, setHowToPlayOpen , highlightDealerBestHand, setHighlightDealerBestHand }) {
    return (
            <Grid container spacing={1}>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => newGame(setGameId, setGame, setSelectedCards)}>New Game</Button>
                </Grid>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => setHowToPlayOpen(true)}>How to play</Button>
                </Grid>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => setHighlightDealerBestHand(!highlightDealerBestHand)}>{highlightDealerBestHand ? 'Hide ' : 'Show '} Dealer Best Hand</Button>
                </Grid>
                <Grid item>
                    <Button style={{ minWidth: '200px' }} color="primary" variant="contained" onClick={() => dealCard({ gameId, selectedCards, setGame })}>{"Deal Card" + expectedDealerCardsText(game, selectedCards)}</Button>
                </Grid>
            </Grid>
    )
}

function toggle(cards, selectedCards, setSelectedCards) {
    let unselected = cards.filter(card => selectedCards.filter(selectedCard => selectedCard.suit === card.suit && selectedCard.rank === card.rank).length === 0)
    if (unselected.length) {
        setSelectedCards([...selectedCards, ...unselected])
    } else {
        setSelectedCards(selectedCards.filter(selectedCard => cards.filter(card => card.suit === selectedCard.suit && card.rank === selectedCard.rank).length === 0))
    }
}

export default function PokerPage() {
    const [game, setGame] = useState(freshGame())
    const [loading, setLoading] = useState(true)
    const [gameId, setGameId] = useState(null)
    const [selectedCards, setSelectedCards] = useState([]);
    const [dimensions, setDimensions] = useState(cardDimensions(window.innerWidth, window.innerHeight));
    const [howToPlayOpen, setHowToPlayOpen] = useState(false);
    const [highlightDealerBestHand, setHighlightDealerBestHand] = useState(false);

    useEffect(() => {
        function handleKeyDown(e) {
            if (hotkey_map[e.key.toLowerCase()]) {   
                toggle(hotkey_map[e.key.toLowerCase()], selectedCards, setSelectedCards)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [gameId, selectedCards, setSelectedCards, setGame])

    useEffect(() => {
        document.body.classList.add('poker');
        setLoading(false);

        return () => {
            document.body.classList.remove('poker');
        };
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setDimensions(cardDimensions(window.innerWidth, window.innerHeight))
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    useEffect(() => {
        fetchWrapper(URL + '/new_game', {}, 'POST')
            .then(data => {
                setGameId(data.gameId)
            })
    }, [])

    if (loading || !gameId) {
        return <div>Loading...</div>
    }

    function calculateBackground(suit, rank) {
        if (!game) {
            return
        }
        if (game.playerCards.filter(card => card.suit === suit && card.rank === name_to_rank[rank]).length > 0) {
            return 'orange'
        } else if (game.dealerCards.filter(card => card.suit === suit && card.rank === name_to_rank[rank]).length > 0) {
            return 'gray'
        } else if (selectedCards.filter(card => card.suit === suit && card.rank === rank).length > 0) {
            return 'blue'
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                <Buttons gameId={gameId} setGameId={setGameId} game={game} setGame={setGame} selectedCards={selectedCards} setSelectedCards={setSelectedCards} setHowToPlayOpen={setHowToPlayOpen} highlightDealerBestHand={highlightDealerBestHand} setHighlightDealerBestHand={setHighlightDealerBestHand}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardGrid game={game} selectedCards={selectedCards} setSelectedCards={setSelectedCards} calculateBackground={calculateBackground} cardDimensions={dimensions}/>
            </div>
            <PlayerCards cardDimensions={dimensions} cards={game?.playerCards} />
            <PlayerCards cardDimensions={dimensions} cards={game?.dealerCards} dealerHandDescription={game.dealerHandDescription} dealerBestHand={highlightDealerBestHand ? game.dealerHand : []} isDealer={true} />
             <HowToPlayDialog open={howToPlayOpen} handleClose={() => setHowToPlayOpen(false)} />
       </div>
    )
}