let hiddenWord;
let guessedWord;
let misses;
const ALLOWED_MISSES = 6;
const wordDiv = document.getElementById("word");
const missesDiv = document.getElementById("misses");
const messageDiv = document.getElementById("message");
const resetButton = document.getElementById("restartGame");
const guessCombo = document.getElementById("guess");
initializeGame();

function initializeGame() {
  hiddenWord = assignRandomWord();
  guessedWord = drawBlanks();
  misses = 0;
  wordDiv.innerHTML = guessedWord;
  missesDiv.innerHTML = "";
  messageDiv.className = "";
  messageDiv.innerHTML = "";
  resetButton.classList.remove("greenBorder");
  resetLetters();
}

function assignRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function drawBlanks() {
  return "_".repeat(hiddenWord.length);
}

function resetLetters() {
  for (const option of guessCombo.options) {
    option.disabled = false;
  }
  guessCombo.disabled = false;
  guessCombo.selectedIndex = 0;
}

function letterGuessed() {
  const guessedLetter = guessCombo.value;
  if (hiddenWord.includes(guessedLetter)) {
    const letters = [...hiddenWord];
    letters.forEach((letter, index) => {
      if (guessedLetter === letter) {
        const start = guessedWord.substring(0, index);
        const end = guessedWord.substring(index + 1);
        guessedWord = `${start}${letter}${end}`;
      }
    });
    wordDiv.innerHTML = guessedWord;
    checkForWin();
  }
  else {
    misses++;
    missesDiv.innerHTML += "<img src='miss.png' />";
    checkForLoss();
  }
  guessCombo.options[guessCombo.selectedIndex].disabled = true;
}

function checkForWin() {
  if (guessedWord === hiddenWord) {
    messageDiv.classList.add("greenBorder");
    endGame(`You guessed the word ${hiddenWord}!`);
  }
}

function checkForLoss() {
  if (misses >= ALLOWED_MISSES) {
    messageDiv.classList.add("redBorder");
    endGame(`You lost!  The word was ${hiddenWord}.`);
  }
}

function endGame(gameResult) {
  messageDiv.innerHTML = gameResult;
  guessCombo.disabled = true;
  resetButton.classList.add("greenBorder");
}