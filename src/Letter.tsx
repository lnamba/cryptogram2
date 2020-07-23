import React, { useState } from 'react';

import './styles.css';
import { WindowWidth } from './hooks';

interface Props {
  guess: string;
  isSelected: boolean;
  isPunc: boolean;
  letter: string;
  onClick(letter: string): void;
}

function Letter(props: Props) {
  const { guess, isSelected, isPunc, letter, onClick } = props;
  const styles =
    WindowWidth() > 650
      ? isPunc
        ? { letterSize: '28px', minWidth: '16px' }
        : { letterSize: '28px', minWidth: '36px' }
      : isPunc
      ? { letterSize: '24px', minWidth: '12px' }
      : { letterSize: '24px', minWidth: '32px' };

  function handleClick(letter) {
    onClick(letter);
  }

  let content = (
    <div className='letterContent' onClick={() => handleClick(letter)}>
      <div
        className={`guess nonPunctuation ${isSelected ? 'hasLetter' : ''}`}
        style={{ minWidth: styles.minWidth }}
      >
        {guess ? (
          <h2
            className={`${isSelected ? 'whiteText' : 'blackText'}`}
            style={{ fontSize: styles.letterSize }}
          >
            {guess?.toUpperCase()}
          </h2>
        ) : null}
      </div>

      <div className='outerLetter'>
        <h2 style={{ fontSize: styles.letterSize }}>{letter?.toUpperCase()}</h2>
      </div>
    </div>
  );

  if (isPunc) {
    content = (
      <div className='letterContent'>
        <div className='nonGuess' style={{ minWidth: styles.minWidth }}>
          <h2 className='punctuation' style={{ fontSize: styles.letterSize }}>
            {letter?.toUpperCase()}
          </h2>
        </div>
      </div>
    );
  }

  return <div className='letterContainer'>{content}</div>;
}

export default Letter;
