import React, { useEffect, useState } from 'react';

function WindowWidth() {
  const isClient = typeof window === 'object';

  function getWidth() {
    return isClient ? window.innerWidth : undefined;
  }

  const [windowSize, setWindowSize] = useState(getWidth);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export { WindowWidth };
