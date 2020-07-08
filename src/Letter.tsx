import React from 'react';

import './styles.css';

interface Props {
  letter: string;
}

function Letter(props: Props) {
  const { letter } = props;
  const regex = /[a-zA-Z0-9]+/;

  return (
    <div className='letterContainer'>
      <div className='outerLetter'>
        <div className='innerLetter'>
          <h2>{letter.toUpperCase()}</h2>
        </div>
      </div>
    </div>
  );
}

export default Letter;
