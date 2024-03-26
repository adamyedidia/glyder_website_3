import React, { useEffect, useState , useRef } from 'react';
import texts from './words/lines.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function hashCode(string){
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash;
    }
    return hash;
}

function randomText(texts, seed) {
    let index = 0;
    if (seed) {
        index = Math.abs(hashCode(seed)) % texts.length;
    } else {
        index = Math.floor(Math.random() * texts.length);
    }
    return texts[index];
}

function Text({ words, textIndex }) {
    return (
        <div style={{ width: '70%', flexWrap: 'wrap', fontSize: '24px', textAlign: 'center' }}>
            {words.map((word, index) => {
                let color = 'white';
                if (index < textIndex) {
                    color = 'green';
                } else if (index === textIndex) {
                    color = 'red';
                }
                return <span key={index} style={{ color }}>{word} </span>;
            })}
        </div>
    );
}

function HowToPlayDialog({ open, handleClose }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                style: { backgroundColor: 'black', minWidth: '50%' },
            }}>
                <DialogTitle style={{ color: 'white' }}>How to play</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: 'white' }}>
                        <p> You will get assigned a random sentence or two of text. To move on to the next word, type in the length of the current word or click the corresponding button. There's no punishment for being wrong except that you have to erase your mistake and type the correct answer. </p>
                        <p> You can change the difficulty of the game by selecting easy, medium, or hard (this determines how long the words are, on average). You can set a random seed to get the same text as someone else - if the seed and difficulty are the same, you'll always get the same text. Changes to settings aren't picked up until you hit "New Game" - if you change the difficulty or set a seed and then just hit enter, you'll still have the old settings. </p>
                        <p> At the end, you'll see stats about your speed. </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: 'white' }} onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default function WordLengthPage() {
    let [text, setText] = useState(randomText(texts));
    let [textIndex, setTextIndex] = useState(-1);
    let [submission, setSubmission] = useState('');
    let [loading, setLoading] = useState(true);
    let [startTime, setStartTime] = useState(null);
    let [score, setScore] = useState(null);
    let [difficulty, setDifficulty] = useState(5);
    let [seed, setSeed] = useState('');
    const [howToPlayOpen, setHowToPlayOpen] = useState(false);

    function newGame() {
        let filteredTexts = texts.filter(text => {
            let words = text.split(' ');
            let total = 0;
            words.forEach(word => {
                total += word.length;
            });
            return (total / words.length >= difficulty) && (total / words.length <= difficulty + 1) && words.length > 15 && total > 150;
        });
        setScore(null);
        setText(randomText(filteredTexts, seed));
        setTextIndex(-1);
        setSubmission('');
    }

    useEffect(() => {
        document.body.classList.add('game');
        setLoading(false);

        return () => {
            document.body.classList.remove('game');
        };
    }, []);

    let currentWord = text.split(' ')[textIndex];
    let length = null;
    if (currentWord) {
        currentWord = currentWord.replace(/[^a-zA-Z]/g, '');
        length = currentWord.length;
    }

    useEffect(() => {
        let submissionInt = parseInt(submission);
        if (submissionInt === length) {
            setTextIndex(textIndex + 1);
            setSubmission('');
        }
    }, [submission]);

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Enter' && textIndex === -1) {
                setTextIndex(0);
                setStartTime(Date.now());
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [textIndex]);

    useEffect(() => {
        if (textIndex > text.split(' ').length - 1) {
            let endTime = Date.now();
            let time = endTime - startTime;
            let wpm = Math.round((text.split(' ').length / (time / 1000 / 60)));
            let cpm = Math.round((text.length / (time / 1000 / 60)));
            setScore(`${(time / 1000).toFixed(0)} total seconds, ${wpm} words per minute, ${cpm} characters per minute`);

        }
    }, [textIndex]);

    if (!text || loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', margin: '10px', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button color="primary" variant="contained" component={Link} to="/arcade">Back to Arcade</Button> 
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => setHowToPlayOpen(true)}>How to play</Button>    
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={newGame}>New Game</Button>    
                    </Grid> 
                </Grid> 
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button style={{ margin: '10px', backgroundColor: difficulty === 4 ? 'green' : null }} color="primary" variant="contained" onClick={() => setDifficulty(4)}>Easy</Button>
                <Button style={{ margin: '10px', backgroundColor: difficulty === 5 ? 'green' : null }} color="primary" variant="contained" onClick={() => setDifficulty(5)}>Medium</Button>
                <Button style={{ margin: '10px', backgroundColor: difficulty === 5.5 ? 'green' : null }} color="primary" variant="contained" onClick={() => setDifficulty(5.5)}>Hard</Button>
                <TextField style={{ color: 'white', margin: '10px' }} value={seed} onChange={e => setSeed(e.target.value)} label="Set Random Seed" InputLabelProps={{ style: { textAlign: 'center', color: 'white' } }} inputProps={{ style: { textAlign: 'center', color: 'white' } }} />
            </div>
            {textIndex !== -1 ?
                <Grid container justifyContent="center" style={{ margin: 'auto', width: 'fit-content', marginBottom: '10px' }}>
                    {[...Array(20).keys()].map(i => (
                        <Grid item key={i} xs="auto" style={{ margin: '3px' }}>
                            <Button color="primary" variant="contained" onClick={() => setSubmission(i + 1)}>
                                {i + 1}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                : null}
            {textIndex === -1 ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            </div> : null}
            {textIndex === -1 ? <h2>Hit enter to start</h2> : null}
            {textIndex !== -1 ? <TextField autoFocus inputProps={{ style: { textAlign: 'center' } }} style={{ marginBottom: '10px', padding: '3px', backgroundColor: 'white' }} value={submission} inputMode={"numeric"} onChange={e => setSubmission(e.target.value)} /> : null}
            {textIndex !== -1 ? <Text words={text.split(' ')} textIndex={textIndex} /> : null}
            {score ? <h2>{score}</h2> : null}
            <HowToPlayDialog open={howToPlayOpen} handleClose={() => setHowToPlayOpen(false)} />
        </div>
    )
}