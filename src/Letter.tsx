import React, { useState } from 'react';

import './styles.css';

interface Props {
  guess: string;
  guessedLetter?: string;
  isSelected: boolean;
  isPunc: boolean;
  letter: string;
  onClick(letter: string): void;
}

function Letter(props: Props) {
  const { guess, isSelected, isPunc, letter, onClick } = props;

  function handleClick(letter) {
    onClick(letter);
  }

  if (isPunc) {
    return (
      <div className='letterContainer'>
        <div className='guess'>
          <h2>{letter.toUpperCase()}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='letterContainer' onClick={() => handleClick(letter)}>
      <div className={`guess nonPunctuation ${isSelected ? 'hasLetter' : ''}`}>
        {guess ? <h2>{guess.toUpperCase()}</h2> : null}
      </div>

      <div className='outerLetter'>
        <h2>{letter.toUpperCase()}</h2>
      </div>
    </div>
  );
}

export default Letter;
