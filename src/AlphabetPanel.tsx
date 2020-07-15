import React from 'react';

import LetterButton from './LetterButton';

interface Props {
  alphaData: any;
  onClick(letter: string): void;
}

function AlphabetPanel(props: Props) {
  const { alphaData, onClick } = props;

  return (
    <div className='flexRow fixedWidth'>
      {alphaData.map(({ letter, isUsed }, index) => (
        <div className='alphaContainer' key={index}>
          <LetterButton letter={letter} isUsed={isUsed} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

export default AlphabetPanel;
