import React from 'react';

import './styles.css';
import Word from './Word';

interface Props {
  quote: string;
  quoteData: {
    answer: string;
    letter: string;
    guess: string;
    isSelected: boolean;
    isPunc: boolean;
    isUsed: boolean;
  }[][];
  onClick(letter: string): void;
}

function WordPanel(props: Props) {
  const { onClick, quoteData } = props;

  return (
    <div className='flexRow fixedWidth'>
      {quoteData?.map((data, index) => (
        <Word data={data} key={index} onClick={onClick} />
      ))}
    </div>
  );
}

export default WordPanel;
