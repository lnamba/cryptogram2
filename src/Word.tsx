import React from 'react';

import Letter from './Letter';
import './styles.css';

interface Props {
  index: number;
  quoteData: {
    answer: string;
    letter: string;
    guess: string;
    isSelected: boolean;
    isPunc: boolean;
    isUsed: boolean;
    word: string;
  }[];
  word: string;
  onClick(letter: string): void;
}

function Word(props: Props) {
  const { onClick, quoteData, word } = props;
  console.log(word);

  return (
    <div className=''>
      {quoteData.map((data, index) => {
        if (data.word === word) {
          return (
            <Letter
              letter={data.letter}
              guess={data.guess}
              isSelected={data.isSelected}
              isPunc={data.isPunc}
              onClick={onClick}
              key={index}
            />
          );
        }
      })}
    </div>
  );
}

export default Word;
