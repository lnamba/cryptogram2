import React, { useEffect, useState } from 'react';

import AlphabetPanel from './AlphabetPanel';
import WordPanel from './WordPanel';
import { WindowWidth } from './hooks';
import { initializeAlphabet } from './game.util';

interface Props {
  alphaData: { letter: string; isUsed: boolean }[];
  quote: string;
  shuffledAlphabet: any;
  setGameComplete(): void;
  setAlphaData(data: any): void;
}

function GameContainer(props: Props) {
  const {
    alphaData,
    setGameComplete,
    quote,
    setAlphaData,
    shuffledAlphabet,
  } = props;
  const [quoteData, setQuoteData] = useState<any>([]);
  const [wasReset, setWasReset] = useState(false);
  const fontSize = WindowWidth().width > 650 ? '70px' : '50px';
  const regex = /[a-zA-Z0-9]+/;

  useEffect(() => {
    if (quote) {
      setQuoteData(assignLettersToQuote());
    }
  }, [quote]);

  useEffect(() => {
    const updatedQuoteData = [...quoteData];
    if (
      updatedQuoteData.length &&
      updatedQuoteData.every((word) => {
        return word.every(({ isUsed }) => Boolean(isUsed));
      })
    ) {
      if (
        updatedQuoteData.every((word) =>
          word.every(({ answer, guess }) => answer === guess)
        )
      ) {
        setGameComplete();
      }
    }

    const usedLetters = updatedQuoteData.reduce((letters, word) => {
      word.forEach((letter) => {
        if (letter.guess) {
          letters.push(letter.guess);
        }
      });

      return letters;
    }, []);

    if (!usedLetters.length && wasReset) {
      setAlphaData(initializeAlphabet());
      setWasReset(false);
    } else if (usedLetters.length) {
      setAlphaData((alphaData: { letter: string; isUsed: boolean }[]) => {
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
    const split = quote.split(' ');

    const quoteData = split.reduce((result, word, index) => {
      let letters = [];
      word.split('').forEach((letter, ind) => {
        letters.push({
          answer: letter,
          letter: regex.test(letter) ? shuffledAlphabet[letter] : letter,
          guess: regex.test(letter) ? '' : letter,
          isPunc: !regex.test(letter),
          isSelected: false,
          isUsed: !regex.test(letter),
        });
      });
      result.push(letters);
      letters = [];

      return result;
    }, []);

    console.log(quoteData);
    return quoteData;
  }

  function handleClick(letter) {
    console.log('select', letter);

    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((word) =>
        word.map((item) => ({
          ...item,
          isSelected: item.letter === letter,
        }))
      );
    });
  }

  function handleGuess(letter: string) {
    console.log('guessed', letter);
    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((word) => {
        return word.map((item) => {
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
    });
  }

  function resetAll() {
    setWasReset(true);
    setQuoteData((quoteData) => {
      const updatedQuoteData = [...quoteData];
      return updatedQuoteData.map((word) => {
        return word.map((item) => {
          return {
            ...item,
            guess: '',
            isUsed: false,
            isSelected: false,
          };
        });
      });
    });
  }

  return (
    <div className='cryptogramContainer'>
      <h1 className='header' style={{ fontSize }}>
        Cryptogram
      </h1>
      {quote ? (
        <WordPanel quote={quote} quoteData={quoteData} onClick={handleClick} />
      ) : null}
      <AlphabetPanel alphaData={alphaData} onClick={handleGuess} />

      <div className='clearButton flexRow'>
        <div onClick={() => handleGuess('clear')} className='button'>
          <h2>Clear</h2>
        </div>

        <div onClick={() => resetAll()} className='button'>
          <h2>Reset</h2>
        </div>
      </div>
    </div>
  );
}

export default GameContainer;
