import React from 'react';

import Letter from './Letter';

interface Props {
  data: {
    answer: string;
    letter: string;
    guess: string;
    isSelected: boolean;
    isPunc: boolean;
    isUsed: boolean;
  }[];
  onClick(letter: string): void;
}

function Word(props: Props) {
  const { data, onClick } = props;

  return (
    <div className='word'>
      {data?.map((item, index) => (
        <Letter
          letter={item.letter}
          guess={item.guess}
          isSelected={item.isSelected}
          isPunc={item.isPunc}
          onClick={onClick}
          key={index}
        />
      ))}
    </div>
  );
}

export default Word;
