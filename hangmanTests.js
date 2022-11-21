QUnit.test( "The hidden word is chosen", function( assert ) {
  initializeGame();
  assert.notEqual( hiddenWord, "", "A secret word is chosen." );
});

QUnit.test( "The hidden word is displayed as underscores", function( assert ) {
  initializeGame();
  assert.equal( wordDiv.innerHTML, drawBlanks(hiddenWord.length), "The secret word is not shown except as underscores." );
});

QUnit.test( "Initially there are no misses", function (assert ) {
  initializeGame();
  assert.equal(misses, 0, "When the game starts, you haven't guessed wrong yet." );
});

QUnit.test( "Initially no X images are shown for misses", function (assert ) {
  initializeGame();
  assert.equal(missesDiv.innerHTML, "", "When the game starts, no wrong guesses should be shown." );
});

QUnit.test( "Initially the message div should be blank", function (assert ) {
  initializeGame();
  assert.equal( messageDiv.innerHTML, "", "No message should be displayed when the game starts." );
});

QUnit.test( "Initially the combo box of letters should be enabled", function (assert ) {
  initializeGame();
  assert.equal( guessCombo.disabled, false, "The combo containing letters should be enabled." );
});

QUnit.test( "A random word can be chosen", function (assert ) {
  var word = "";
  word = assignRandomWord();
  assert.notEqual( word, "", "A random word can be chosen from the list." );
});

QUnit.test( "The random word can be obscured by underscores", function (assert ) {
  hiddenWord = "test";
  assert.equal( drawBlanks(), "____", "A word's letters are replaced with underscores." );
});

QUnit.test( "When a correct letter that appears once is guessed, the word is updated with that letter", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 5;
  letterGuessed();
  assert.equal( guessedWord, "_e__", "The letter is updated in the guessed word." );
});

QUnit.test( "When a correct letter that appears once is guessed, the updated word is displayed", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 5;
  letterGuessed();
  assert.equal( wordDiv.innerHTML, "_e__", "The letter is updated in the guessed word." );
});

QUnit.test( "When a correct letter that appears multiple times is guessed, the word is updated with those letters", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 20;
  letterGuessed();
  assert.equal( guessedWord, "t__t", "The letters are updated in the guessed word." );
});

QUnit.test( "When a correct letter that appears multiple times is guessed, the updated word is displayed", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 20;
  letterGuessed();
  assert.equal( wordDiv.innerHTML, "t__t", "The letters are updated in the guessed word." );
});

QUnit.test( "When an incorrect letter is guessed, the number of misses increases by 1", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 1;
  letterGuessed();
  assert.equal( misses, 1, "The number of misses increases from 0 to 1." );
});

QUnit.test( "When an incorrect letter is guessed, another X appears to track misses", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 1;
  letterGuessed();
  assert.equal( missesDiv.innerHTML, "<img src=\"miss.png\">", "An X is displayed as a miss tracker." );
});

QUnit.test( "After a letter is guessed, that letter becomes disabled in the dropdown", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = drawBlanks();
  guessCombo.selectedIndex = 1;
  letterGuessed();
  assert.equal( guessCombo.options[1].disabled, true, "The same letter cannot be guessed again." );
});

QUnit.test( "You win the game when you guess the word", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "test";
  checkForWin();
  assert.equal( messageDiv.innerHTML, "You guessed the word test!", "A message is displayed to show that the player won." );
});

QUnit.test( "You lose the game when you have 6 misses", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "____";
  misses = 6;
  checkForLoss();
  assert.equal( messageDiv.innerHTML, "You lost!  The word was test.", "A message is displayed to show that the player lost." );
});

QUnit.test( "The combo becomes disabled when the game is won", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "test";
  checkForWin();
  assert.equal( guessCombo.disabled, true, "The combo is disabled because the game is over." );
});

QUnit.test( "The combo becomes disabled when the game is lost", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "____";
  misses = 6;
  checkForLoss();
  assert.equal( guessCombo.disabled, true, "The combo is disabled because the game is over." );
});

QUnit.test( "The reset button should be highlighted when the game is won", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "test";
  checkForWin();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should be highlighted when the game is lost", function (assert ) {
  initializeGame();
  hiddenWord = "test";
  guessedWord = "____";
  misses = 6;
  checkForLoss();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  initializeGame();
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});