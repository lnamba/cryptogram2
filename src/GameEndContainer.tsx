import React from 'react';

import './styles.css';
import { WindowWidth } from './hooks';

interface Props {
  author: string;
  quote: string;
  startNewGame(): void;
}

function GameEndContainer(props: Props) {
  const { author, quote, startNewGame } = props;
  const height = WindowWidth().height;

  return (
    <div className='flexColumn endContainer centerAll' style={{ height }}>
      <h1 className='textCenter'>{quote}</h1>
      <h2 className='textCenter'>-{author}</h2>

      <div onClick={startNewGame} className='flexColumn button'>
        <h2>New game</h2>
      </div>
    </div>
  );
}

export default GameEndContainer;
