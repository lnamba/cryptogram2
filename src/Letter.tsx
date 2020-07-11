import React, { useState } from 'react';

import './styles.css';

interface Props {
  guess: string;
  guessedLetter?: string;
  isSelected: boolean;
  isPunc: boolean;
  isUsed: boolean;
  letter: string;
  onClick(letter: string): void;
}

function Letter(props: Props) {
  const { guess, isSelected, isPunc, isUsed, letter, onClick } = props;
  // const [isSelected, setIsSelected] = useState<boolean>(false);

  function handleClick(letter) {
    // const updatedIsSelected = !isSelected;
    // setIsSelected(updatedIsSelected);
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
