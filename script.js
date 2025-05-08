const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Create cells dynamically
function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add(
      "cell",
      "w-20",
      "h-20",
      "bg-white",
      "bg-opacity-20",
      "flex",
      "items-center",
      "justify-center",
      "text-4xl",
      "font-bold",
      "rounded-lg",
      "hover:bg-opacity-40"
    );
    cellDiv.setAttribute("data-index", index);
    cellDiv.addEventListener("click", handleClick);
    cellDiv.textContent = cell;
    board.appendChild(cellDiv);
  });
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (gameBoard[index] !== "" || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw! 🤝";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    );
  });
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player X's Turn`;
  createBoard();
}

// Initialize board on load
createBoard();
