import React from 'react';

interface Props {
  letter: string;
  onClick(letter: string): void;
}

function LetterButton(props: Props) {
  const { letter, onClick } = props;

  return (
    <div className='alpha' onClick={() => onClick(letter)}>
      <h1>{letter}</h1>
    </div>
  );
}

export default LetterButton;
