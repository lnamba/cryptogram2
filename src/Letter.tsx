import React, { useState } from 'react';

import './styles.css';
import { WindowWidth } from './hooks';

interface Props {
  guess: string;
  isSelected: boolean;
  isPunc: boolean;
  letter: string;
  word?: string;
  onClick(letter: string): void;
}

function Letter(props: Props) {
  const { guess, isSelected, isPunc, letter, onClick, word } = props;
  const styles =
    WindowWidth() > 650
      ? { letterSize: '40px', minWidth: '50px' }
      : { letterSize: '24px', minWidth: '32px' };

  function handleClick(letter) {
    onClick(letter);
  }

  if (isPunc) {
    return (
      <div className='letterContainer'>
        <div className='guess' style={{ minWidth: styles.minWidth }}>
          <h2 className='punctuation' style={{ fontSize: styles.letterSize }}>
            {letter.toUpperCase()}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='letterContainer' onClick={() => handleClick(letter)}>
      <div
        className={`guess nonPunctuation ${isSelected ? 'hasLetter' : ''}`}
        style={{ minWidth: styles.minWidth }}
      >
        {guess ? (
          <h2
            className={`${isSelected ? 'whiteText' : 'blackText'}`}
            style={{ fontSize: styles.letterSize }}
          >
            {guess.toUpperCase()}
          </h2>
        ) : null}
      </div>

      <div className='outerLetter'>
        <h2 style={{ fontSize: styles.letterSize }}>{letter.toUpperCase()}</h2>
      </div>
    </div>
  );
}

export default Letter;
