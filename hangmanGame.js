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
  wordDiv.innerHTML = guessedWord;
  missesDiv.innerHTML = "";
  misses = 0;
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
  var blankString = "";
  for (let i = 0; i < hiddenWord.length; i++) {
    blankString += "_";
  }
  return blankString;
}

function resetLetters() {
  for (let i = 0; i < guessCombo.length; i++) {
    guessCombo.options[i].disabled = false;
  }
  guessCombo.disabled = false;
  guessCombo.selectedIndex = 0;
}

function letterGuessed() {
  letter = guessCombo.value;
  if (hiddenWord.indexOf(letter) !== -1) {
    for (let i = 0; i < hiddenWord.length; i++) {
      if (letter === hiddenWord[i]) {
        guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
      }
    }
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