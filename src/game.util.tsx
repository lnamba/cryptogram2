import { ALPHABET } from './alphabet.constant';

function initializeAlphabet() {
  const initial = [...ALPHABET];
  return initial.reduce((alphabet, letter) => {
    alphabet.push({
      letter,
      isUsed: false,
    });
    return alphabet;
  }, []);
}

export { initializeAlphabet };
