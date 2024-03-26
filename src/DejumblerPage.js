import React, { useEffect, useState } from 'react';
import definitions from './words/definitions.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
                      <p> Your goal is to the guess the top word. It is anagramed, and one letter is replaced with a random letter. </p>
                      <p> You're given the part of the speech and the definition, but the definition is anagramed as well. You can click on words in the definition and then type in a dejumbled version of them to de-anagram them. </p>
                      <p> You win when you submit a dejumbled version of the real word. </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: 'white' }} onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default function DejumblerPage() {
  const [loading, setLoading] = useState(true);
  const [anagramWord, setAnagramWord] = useState('');
  const [anagramDefinition, setAnagramDefinition] = useState([]);
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [guess, setGuess] = useState('');
  const [solutionGuess, setSolutionGuess] = useState('');
  const [word, setWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [solved, setSolved] = useState(false);
  const [flashingRed, setFlashingRed] = useState(false);
  const [flashWord, setFlashWord] = useState(null);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('game');
    setLoading(false);

    return () => {
      document.body.classList.remove('game');
    };
  }, []);

  // Function to anagram a word
  const anagram = (word) => {
    const letters = word.split('').filter((c, i) => i !== 0 && c.match(/[a-z]/i));
    let shuffledLetters;
    do {
      shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    } while (letters.join('') === shuffledLetters.join('') && letters.length >= 3);
    let index = 0;
    return word.split('').map((c, i) => i !== 0 && c.match(/[a-z]/i) ? shuffledLetters[index++] : c).join('');
  };

  const hardAnagram = (word) => {
    const letters = word.split('').filter(c => c.match(/[a-z]/i));
    const shuffledLetters = letters.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(Math.random() * shuffledLetters.length);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    while (randomLetter === shuffledLetters[randomIndex]) {
      randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    shuffledLetters[randomIndex] = randomLetter;
    let index = 0;
    return word.split('').map(c => c.match(/[a-z]/i) ? shuffledLetters[index++] : c).join('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id !== 'guess' && event.target.id !== 'submitGuess') {
        setCurrentWordIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const solve = () => {
    setAnagramWord(word);
    const definition = definitions[word].definition;
    const anagrammedDefinition = definition.split(' ').map(word => ({ original: word, anagram: word, guess: word }));
    setAnagramDefinition(anagrammedDefinition);
    setSolved(true);
    setCurrentWordIndex(null);
    setSolutionGuess('');
  }

  const checkGuess = () => {
    if (solved) {
      return
    }
    if (solutionGuess.toLowerCase() === word.toLowerCase()) {
      solve();
    } else if (solutionGuess !== '') {
      setSolutionGuess('');
      setFlashingRed(true);
      setTimeout(() => setFlashingRed(false), 1000);
    }
  };

  const getNewWord = () => {
    const words = Object.keys(definitions);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setAnagramWord(hardAnagram(randomWord));
    const definition = definitions[randomWord].definition;
    const partOfSpeech = definitions[randomWord].partOfSpeech;

    setPartOfSpeech(partOfSpeech);
    const anagrammedDefinition = definition.split(' ').map(word => ({ original: word, anagram: anagram(word), guess: null }));
    setAnagramDefinition(anagrammedDefinition);
    setSolved(false);
  }

  useEffect(() => {
    getNewWord();
  }, []);

  const handleWordClick = (index) => {
    if (!solved) {
      setCurrentWordIndex(index);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (currentWordIndex) {
        handleWordGuess();
      } else {
        checkGuess();
      }
    }
    if (event.key === 'Escape') {
      setCurrentWordIndex(null);
    }
  };

  const handleWordGuess = () => {
    if (currentWordIndex == null) return;
    const originalWord = anagramDefinition[currentWordIndex].original;
    const guessWithoutPunctuation = guess.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    const originalWordWithoutPunctuation = originalWord.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    console.log(guessWithoutPunctuation)
    console.log(originalWordWithoutPunctuation)

    if (guessWithoutPunctuation.toLowerCase() === originalWordWithoutPunctuation.toLowerCase()) {
      const punctuatedGuess = originalWord;
      setAnagramDefinition(anagramDefinition.map((word, i) => i === currentWordIndex ? { ...word, guess: punctuatedGuess } : word));
      setGuess('');
      setCurrentWordIndex(null);
    } else {
      setGuess('');
      setFlashWord(currentWordIndex);
      setTimeout(() => setFlashWord(null), 1000);
      setCurrentWordIndex(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '100vw', marginLeft: '15px' }}>
      <HowToPlayDialog open={howToPlayOpen} handleClose={() => setHowToPlayOpen(false)} />
      <Grid container direction="column" spacing={2} style={{ color: 'white' }}>
        <Grid item>
          <Typography variant="h1" style={{ color: flashingRed ? 'red' : solved ? 'green' : 'white' }}>{anagramWord}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">{partOfSpeech}</Typography>
        </Grid>
        <Grid item container direction="row" spacing={2} style={{ alignItems: 'center', maxWidth: '90%' }}>
          {anagramDefinition.map((word, index) => (
            <Grid item>
              {index !== currentWordIndex ? <Box component="span" m={1} onClick={word.guess ? () => { } : () => handleWordClick(index)} style={{ ...(solved || word.guess ? {} : { cursor: 'pointer' }), color: flashWord === index ? 'red' : word.guess ? 'green' : 'white' }}>
                <Typography variant="h2">{word.guess || word.anagram}</Typography>
              </Box> : (
                <Grid item container direction="row" spacing={2}>
                  <Grid item>
                    <TextField
                      InputLabelProps={{ style: { color: 'white' } }}
                      inputProps={{ style: { color: 'white' } }}
                      id="guess"
                      label={word.anagram}
                      variant="outlined"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      onKeyPress={handleKeyPress}
                      autoFocus
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleWordGuess} id="submitGuess">Submit</Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="row" spacing={2} style={{ alignItems: 'center' }}>
          <Grid item>
            <TextField InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }} id="guessWord" label="Guess the word" variant="outlined" value={solutionGuess} onChange={(e) => setSolutionGuess(e.target.value)} onKeyPress={handleKeyPress} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/arcade">Back to Arcade</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={checkGuess}>Submit</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={solve}>Give up</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={getNewWord}>New word</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setHowToPlayOpen(true)}>How to play</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}