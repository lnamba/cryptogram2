import React from 'react';

import LetterButton from './LetterButton';

interface Props {
  alphaData: any;
  onClick(letter: string): void;
}

function AlphabetPanel(props: Props) {
  const { alphaData, onClick } = props;

  return (
    <div className='flexRow'>
      {alphaData.map((letter, index) => (
        <div className='alphaContainer' key={index}>
          <LetterButton letter={letter.letter} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

export default AlphabetPanel;
