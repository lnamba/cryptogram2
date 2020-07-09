import React, { useEffect, useState } from 'react';

import AlphabetPanel from './AlphabetPanel';
import WordPanel from './WordPanel';

const alpha = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

function App(): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [shuffledAlphabet, setShuffledAlphabet] = useState({});
  const [quoteData, setQuoteData] = useState<
    { letter: string; guess: string; isSelected: boolean; isPunc?: boolean }[]
  >([]);
  const [alphaData, setAlphaData] = useState([]);
  const [guessedLetter, setGuessedLetter] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoaded(true);
        setQuote(data.quote.toUpperCase());
        setAuthor(data.author);
      });

    setShuffledAlphabet(shuffle());
    setAlphaData(initializeAlphabet());
  }, []);

  useEffect(() => {
    if (quote) {
      setQuoteData(assignLettersToQuote());
    }
  }, [quote]);

  function assignLettersToQuote() {
    const quoteData = [];
    const regex = /[a-zA-Z0-9]+/;

    for (let i = 0; i < quote.length; i++) {
      if (regex.test(quote[i])) {
        quoteData.push({
          letter: shuffledAlphabet[quote[i]],
          guess: '',
          isPunc: false,
          isSelected: false,
        });
      } else {
        quoteData.push({
          letter: quote[i],
          guess: '',
          isPunc: true,
          isSelected: false,
        });
      }
    }

    console.log('assignLettersToQuote', quoteData);
    return quoteData;
  }

  function handleClick(letter) {
    console.log('select', letter);
    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((item) => {
        if (item.letter === letter) {
          return {
            ...item,
            isSelected: true,
          };
        }
        return {
          ...item,
          isSelected: false,
        };
      });
    });
  }

  function handleGuess(letter: string) {
    console.log('guessed', letter);
    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      const test = updatedQuoteData.map((item) => {
        if (item.isSelected) {
          return {
            ...item,
            guess: letter,
          };
        }
        return item;
      });
      console.log(test);
      return test;
    });
  }

  function initializeAlphabet() {
    const initial = [...alpha];
    return initial.reduce((alphabet, letter) => {
      alphabet.push({
        letter,
        [letter]: false,
      });
      return alphabet;
    }, []);
  }

  function shuffle() {
    const initial = alpha.slice();

    let curr = initial.length;
    let temp;
    let randIndex;

    while (curr != 0) {
      //keep shuffling while there are still elems to shuffle
      randIndex = Math.floor(Math.random() * curr); // get random index whith elements leftover still
      curr -= 1;
      temp = initial[curr]; // set temp to the element at curr
      initial[curr] = initial[randIndex]; // make the current equal the random element from above
      initial[randIndex] = temp;
    }

    return initial.reduce((updatedAlphabet, letter, index) => {
      updatedAlphabet[letter] = alpha[index];
      return updatedAlphabet;
    }, {});
  }

  return (
    <div>
      <h1>Cryptogram</h1>
      {isLoaded ? (
        <WordPanel
          guessedLetter={guessedLetter}
          quote={quote}
          quoteData={quoteData}
          onClick={handleClick}
        />
      ) : null}
      <AlphabetPanel alphaData={alphaData} onClick={handleGuess} />
    </div>
  );
}

export default App;
