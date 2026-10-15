const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetButton = document.getElementById("reset");
const cells = [...board.querySelectorAll(".cell")];

let squares = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function getWinner() {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function updateStatus() {
  const winner = getWinner();
  if (winner) {
    statusEl.textContent = `${winner.player} wins`;
    return;
  }
  if (squares.every(Boolean)) {
    statusEl.textContent = "It's a draw";
    return;
  }
  statusEl.textContent = `${currentPlayer}'s turn`;
}

function handleMove(index) {
  if (gameOver || squares[index]) {
    return;
  }

  squares[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].disabled = true;

  const winner = getWinner();
  if (winner) {
    gameOver = true;
    winner.line.forEach((i) => cells[i].classList.add("win"));
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    updateStatus();
    return;
  }

  if (squares.every(Boolean)) {
    gameOver = true;
    updateStatus();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function resetGame() {
  squares = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("win");
  });
  updateStatus();
}

board.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (!cell) {
    return;
  }
  handleMove(Number(cell.dataset.index));
});

resetButton.addEventListener("click", resetGame);
updateStatus();
