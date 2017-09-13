var hiddenWord;
var guessedWord;
var misses;
var wordDiv = document.getElementById("word");
var missesDiv = document.getElementById("misses");
var messageDiv = document.getElementById("message");
var resetButton = document.getElementById("restartGame");
var guessCombo = document.getElementById("guess");
initializeGame();

function initializeGame() {
	hiddenWord = assignRandomWord();
	guessedWord = drawBlanks(hiddenWord.length);
	wordDiv.innerHTML = guessedWord;
	missesDiv.innerHTML = "";
	misses = 0;
	messageDiv.className = "";
	messageDiv.innerHTML = "";
	resetButton.classList.remove("greenBorder");
	resetLetters();
}

function assignRandomWord() {
	var index = Math.floor(Math.random() * words.length);
	return words[index];
}

function drawBlanks(length) {
	var blankString = "";
	for (var i = 0; i < length; i++) {
		blankString += "_";
	}
	return blankString;
}

function resetLetters() {
	for (var i = 0; i < guessCombo.length; i++) {
		guessCombo.options[i].disabled = false;
	}
	guessCombo.disabled = false;
	guessCombo.selectedIndex = 0;
}

function letterGuessed(combo) {
	letter = combo.value;
	if (hiddenWord.indexOf(letter) !== -1) {
		for (var i = 0; i < hiddenWord.length; i++) {
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
	combo.options[combo.selectedIndex].disabled = true;
}

function checkForWin() {
	if (guessedWord === hiddenWord) {
		messageDiv.classList.add("greenBorder");
		endGame("You guessed the word " + hiddenWord + "!");
	}
}

function checkForLoss() {
	if (misses >= 6) {
		messageDiv.classList.add("redBorder");
		endGame("You lost!  The word was " + hiddenWord + ".");
    }
}

function endGame(gameResult) {
	messageDiv.innerHTML = gameResult;
	guessCombo.disabled = true;
	resetButton.classList.add("greenBorder");
}