import React from 'react';

import './styles.css';
import Word from './Word';
import Letter from './Letter';

interface Props {
  quote: string;
  quoteData: {
    answer: string;
    letter: string;
    guess: string;
    isSelected: boolean;
    isPunc: boolean;
    isUsed: boolean;
    word: string;
  }[];
  onClick(letter: string): void;
}

function WordPanel(props: Props) {
  const { onClick, quote, quoteData } = props;

  return (
    <div className='flexRow fixedWidth'>
      {quoteData?.map((data, index) => (
        // <Word
        //   word={data.word}
        //   onClick={onClick}
        //   index={index}
        //   quoteData={quoteData}
        //   key={index}
        // />
        <Letter
          letter={data.letter}
          guess={data.guess}
          isSelected={data.isSelected}
          isPunc={data.isPunc}
          onClick={onClick}
          key={index}
          word={data.word}
        />
      ))}
    </div>
  );
}

export default WordPanel;
