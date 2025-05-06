"use client";
import LetterDropdown from "@/components/letterDropdown";
import React from "react";
import { ALLOWED_MISSES } from "@/constants";
import { allLettersGuessed } from "@/lib/checkWord";

export default function Home() {
  const [message, setMessage] = React.useState<string>("");
  const [misses, setMisses] = React.useState<number>(0);
  const [hiddenWord, setHiddenWord] = React.useState<string>("");
  React.useEffect(() => {
    chooseWord();
  }, []);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

  async function chooseWord() {
    const response = await fetch("/api/get-word");
    const word = await response.text();
    setHiddenWord(word);
  }

  function handleLetterGuess(e: React.ChangeEvent<HTMLSelectElement>) {
    const newGuessedLetters = guessedLetters.slice();
    const guessedLetter = e.target.value;
    newGuessedLetters.push(guessedLetter);
    setGuessedLetters(newGuessedLetters);

    if (!hiddenWord.includes(guessedLetter)) {
      setMisses(misses + 1);
      checkForLoss(misses + 1);
      return;
    }

    checkForWin(newGuessedLetters);
  }

  function checkForWin(guesses: string[]) {
    if (allLettersGuessed(hiddenWord, guesses)) {
      setMessage(`You guessed the word ${hiddenWord}!`);
      setIsGameOver(true);
    }
  }

  function checkForLoss(misses: number) {
    if (misses >= ALLOWED_MISSES) {
      setMessage(`You lost!  The word was ${hiddenWord}.`);
      setIsGameOver(true);
    }
  }

  function resetGame() {
    setMessage("");
    setMisses(0);
    chooseWord();
    setGuessedLetters([]);
    setIsGameOver(false);
  }

  return (
    <>
      <div id="word" className="block">
        {Array.from(hiddenWord).map((letter, index) => (
          <span key={`letter${index}`}>
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>
      Guess a letter:&nbsp;
      <LetterDropdown
        clickHandler={handleLetterGuess}
        guessed={guessedLetters}
        value={guessedLetters[guessedLetters.length - 1] || ""}
      />
      <div className="block">
        <span id="message">{message}</span>
      </div>
      <div id="misses">
        {new Array(misses).fill(0).map((_, index) => (
          <img key={`miss${index}`} src="miss.png"></img>
        ))}
      </div>
      <input
        disabled={!isGameOver}
        id="restartGame"
        type="button"
        value="Reset"
        onClick={resetGame}
      />
    </>
  );
}
