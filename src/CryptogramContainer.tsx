import React, { useEffect, useState } from 'react';

import AlphabetPanel from './AlphabetPanel';
import WordPanel from './WordPanel';
import { WindowWidth } from './hooks';

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
    {
      answer: string;
      letter: string;
      guess: string;
      isSelected: boolean;
      isPunc: boolean;
      isUsed: boolean;
    }[]
  >([]);
  const [alphaData, setAlphaData] = useState([]);
  const fontSize = WindowWidth() > 650 ? '100px' : '50px';
  const regex = /[a-zA-Z0-9]+/;

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

  useEffect(() => {
    const updatedQuoteData = [...quoteData];
    if (
      updatedQuoteData.length &&
      updatedQuoteData.every(({ isUsed }) => Boolean(isUsed))
    ) {
      if (updatedQuoteData.every(({ answer, guess }) => answer === guess)) {
        window.alert('winner');
      } else {
        window.alert('loser');
      }
    }

    const usedLetters = updatedQuoteData.reduce((letters, letter) => {
      if (letter.guess) {
        letters.push(letter.guess);
      }

      return letters;
    }, []);

    if (usedLetters.length) {
      setAlphaData((alphaData) => {
        const updatedAlphaData = [...alphaData];
        return updatedAlphaData.map((item) => {
          const result = {
            ...item,
            isUsed: usedLetters.includes(item.letter),
          };
          return result;
        });
      });
    }
  }, [quoteData]);

  function assignLettersToQuote() {
    const quoteData = [];

    for (let i = 0; i < quote.length; i++) {
      if (regex.test(quote[i])) {
        quoteData.push({
          answer: quote[i],
          letter: shuffledAlphabet[quote[i]],
          guess: '',
          isPunc: false,
          isSelected: false,
          isUsed: false,
        });
      } else {
        quoteData.push({
          answer: quote[i],
          letter: quote[i],
          guess: quote[i],
          isPunc: true,
          isSelected: false,
          isUsed: true,
        });
      }
    }

    return quoteData;
  }

  function handleClick(letter) {
    console.log('select', letter);

    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((item) => {
        return {
          ...item,
          isSelected: item.letter === letter,
        };
      });
    });
  }

  function handleGuess(letter: string) {
    console.log('guessed', letter);
    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((item) => {
        if (item.isSelected) {
          return {
            ...item,
            guess: letter === 'clear' ? '' : letter,
            isUsed: letter !== 'clear',
          };
        }
        return item;
      });
    });
  }

  function initializeAlphabet() {
    const initial = [...alpha];
    return initial.reduce((alphabet, letter) => {
      alphabet.push({
        letter,
        isUsed: false,
      });
      return alphabet;
    }, []);
  }

  function shuffle() {
    const initial = alpha.slice();

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

    const match = alpha.find((letter, index) => letter === initial[index]);

    // if any element is in the same place, shuffle again
    if (match) {
      return shuffle();
    }

    return initial.reduce((updatedAlphabet, letter, index) => {
      updatedAlphabet[letter] = alpha[index];
      return updatedAlphabet;
    }, {});
  }

  return (
    <div className='cryptogramContainer'>
      <h1 className='header' style={{ fontSize }}>
        Cryptogram
      </h1>
      {isLoaded ? (
        <WordPanel quote={quote} quoteData={quoteData} onClick={handleClick} />
      ) : null}
      <AlphabetPanel alphaData={alphaData} onClick={handleGuess} />

      <div
        className='clearButton flexColumn'
        onClick={() => handleGuess('clear')}
      >
        <h2>Clear</h2>
      </div>
    </div>
  );
}

export default App;
