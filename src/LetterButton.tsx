import React from 'react';
import { noop } from 'lodash';

interface Props {
  isUsed: boolean;
  letter: string;
  onClick(letter: string): void;
}

function LetterButton(props: Props) {
  const { isUsed, letter, onClick } = props;

  return (
    <div
      className={`pointer ${isUsed ? 'isUsed' : ''}`}
      onClick={() => (isUsed ? noop() : onClick(letter))}
    >
      <h1 className='letterTileText'>{letter}</h1>
    </div>
  );
}

export default LetterButton;
