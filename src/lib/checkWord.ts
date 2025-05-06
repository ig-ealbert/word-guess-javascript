export function allLettersGuessed(hiddenWord: string, guesses: string[]) {
  for (const letter of hiddenWord) {
    if (!guesses.includes(letter)) {
      return false;
    }
  }
  return true;
}
