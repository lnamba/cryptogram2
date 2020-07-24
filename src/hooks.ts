import React, { useEffect, useState } from 'react';

function WindowWidth() {
  const isClient = typeof window === 'object';

  function getWindowSize() {
    return isClient
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: undefined, height: undefined };
  }

  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export { WindowWidth };
