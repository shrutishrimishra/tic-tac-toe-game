const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.getElementById('winningMessageText');
const gameOverMessage = document.getElementById('gameOverMessage');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'x';
const O_CLASS = 'o';
let isCircleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  board.classList.remove(O_CLASS);
  board.classList.add(X_CLASS);
  gameOverMessage.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? O_CLASS : X_CLASS;
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  board.classList.add(isCircleTurn ? O_CLASS : X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combo =>
    combo.every(index => cells[index].classList.contains(currentClass))
  );
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

function endGame(draw) {
  if (draw) {
    winningMessageText.textContent = "😶 It's a Draw!";
    winningMessageText.style.color = '#555';
  } else {
    winningMessageText.textContent = `🎉 ${isCircleTurn ? "O" : "X"} Wins!`;
    winningMessageText.style.color = '#28a745';
  }
  gameOverMessage.classList.add('show');
}
