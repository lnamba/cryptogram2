import React, { useEffect, useState } from 'react';

import GameContainer from './GameContainer';
import GameEndContainer from './GameEndContainer';
import { ALPHABET } from './alphabet.constant';
import { initializeAlphabet } from './game.util';

function CryptogramContainer(): React.ReactElement {
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [shuffledAlphabet, setShuffledAlphabet] = useState({});
  const [alphaData, setAlphaData] = useState([]);

  useEffect(() => {
    if (!isGameComplete) {
      fetch('http://localhost:3000/quotes/random')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setQuote(data.quote);
          setAuthor(data.author);
        });

      setShuffledAlphabet(shuffle());
      setAlphaData(initializeAlphabet());
    }
  }, [isGameComplete]);

  function shuffle() {
    const initial = ALPHABET.slice();

    let current = initial.length;
    let temp;
    let index;

    while (current !== 0) {
      //keep shuffling while there are still elems to shuffle
      index = Math.floor(Math.random() * current); // get random index whith elements leftover still
      current -= 1;
      temp = initial[current]; // set temp to the element at current
      initial[current] = initial[index]; // make the current equal the random element
      initial[index] = temp;
    }

    const match = ALPHABET.find((letter, index) => letter === initial[index]);

    // if any element is in the same place, shuffle again
    if (match) {
      return shuffle();
    }

    return initial.reduce((updatedAlphabet, letter, index) => {
      updatedAlphabet[letter] = ALPHABET[index];
      return updatedAlphabet;
    }, {});
  }

  function handleGameComplete() {
    setIsGameComplete(true);
  }

  function startNewGame() {
    setIsGameComplete(false);
  }

  return isGameComplete ? (
    <GameEndContainer
      quote={quote}
      author={author}
      startNewGame={startNewGame}
    />
  ) : (
    <GameContainer
      alphaData={alphaData}
      setGameComplete={handleGameComplete}
      quote={quote.toUpperCase()}
      shuffledAlphabet={shuffledAlphabet}
      setAlphaData={setAlphaData}
    />
  );
}

export default CryptogramContainer;
