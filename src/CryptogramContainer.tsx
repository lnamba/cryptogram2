import React, { useEffect, useState } from 'react';

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
  const [quoteData, setQuoteData] = useState({});

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
  }, []);

  useEffect(() => {
    if (quote) {
      assignLettersToQuote();
    }
  }, [quote]);

  function assignLettersToQuote() {
    let shuffledQuote = '';
    const regex = /[a-zA-Z0-9]+/;
    console.log('assignLettersToQuote', shuffledAlphabet);

    for (let i = 0; i < quote.length; i++) {
      if (regex.test(quote[i])) {
        shuffledQuote += shuffledAlphabet[quote[i]];
      } else {
        shuffledQuote += quote[i];
      }
    }

    console.log('assignLettersToQuote', shuffledQuote);
    return shuffledQuote;
  }

  function shuffle() {
    const initial = alpha.slice();

    let curr = alpha.length,
      temp,
      randIndex;

    while (curr != 0) {
      //keep shuffling while there are still elems to shuffle
      randIndex = Math.floor(Math.random() * curr); // get random index whith elements leftover still
      curr -= 1;
      temp = alpha[curr]; // set temp to the element at curr
      alpha[curr] = alpha[randIndex]; // make the current equal the random element from above
      alpha[randIndex] = temp;
    }
    return initial.reduce((updatedAlphabet, letter, index) => {
      updatedAlphabet[letter] = alpha[index];
      return updatedAlphabet;
    }, {});
  }

  return (
    <div>
      <h1>Cryptogram</h1>
      {isLoaded ? <WordPanel quote={quote} /> : null}
    </div>
  );
}

export default App;
