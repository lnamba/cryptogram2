import React from 'react';

import './styles.css';
import Letter from './Letter';

interface Props {
  quote: string;
}

function WordPanel(props: Props) {
  const { quote } = props;

  return (
    <div className='flexRow'>
      {quote.split('').map((letter, index) => (
        <Letter letter={letter} key={index} />
      ))}
    </div>
  );
}

export default WordPanel;
