import React from 'react';

import './styles.css';
import Letter from './Letter';

interface Props {
  guessedLetter?: string;
  quote: string;
  quoteData: {
    answer: string;
    letter: string;
    guess: string;
    isSelected: boolean;
    isPunc: boolean;
    isUsed: boolean;
  }[];
  onClick(letter: string): void;
}

function WordPanel(props: Props) {
  const { guessedLetter, onClick, quoteData } = props;

  return (
    <div className='flexRow fixedWidth'>
      {quoteData?.map((data, index) => (
        <Letter
          letter={data.letter}
          guess={data.guess}
          guessedLetter={guessedLetter}
          isSelected={data.isSelected}
          isPunc={data.isPunc}
          onClick={onClick}
          key={index}
        />
      ))}
    </div>
  );
}

export default WordPanel;
