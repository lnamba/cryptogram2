import React from 'react';

interface Props {
  isUsed: boolean;
  letter: string;
  onClick(letter: string): void;
}

function LetterButton(props: Props) {
  const { isUsed, letter, onClick } = props;

  return (
    <div
      className={`alpha ${isUsed ? 'isUsed' : ''}`}
      onClick={() => onClick(letter)}
    >
      <h1>{letter}</h1>
    </div>
  );
}

export default LetterButton;
