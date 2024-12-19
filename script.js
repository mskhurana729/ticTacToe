const GameBoard = (function () {
  const gameBoard = [];
  const winnerContainer = document.querySelector(".winnerContainer");

  function Cell() {
    let symbol = "";
    let player = "";
    return { symbol, player };
  }

  const players = {
    player1: {
      symbol: "X",
      player: "player1",
    },
    player2: {
      symbol: "O",
      player: "player2",
    },
  };

  //this function will check if a row has same symbol or a column has all same symbols or if diagonals have same symbol
  const checkIfSomeoneWon = function (player) {
    let someBodyWon = false;
    console.log(gameBoard);

    if (
      //this checks if all the cells have same symbol and that the cells are not empty
      //row check
      (gameBoard[0][1].symbol === gameBoard[0][2].symbol &&
        gameBoard[0][2].symbol === gameBoard[0][0].symbol &&
        gameBoard[0][0].symbol) ||
      (gameBoard[1][1].symbol === gameBoard[1][2].symbol &&
        gameBoard[1][2].symbol === gameBoard[1][0].symbol &&
        gameBoard[1][0].symbol) ||
      (gameBoard[2][1].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol) ||
      //column check
      (gameBoard[0][0].symbol === gameBoard[1][0].symbol &&
        gameBoard[1][0].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol) ||
      (gameBoard[0][1].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][1].symbol &&
        gameBoard[2][1].symbol) ||
      (gameBoard[0][2].symbol === gameBoard[1][2].symbol &&
        gameBoard[1][2].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol) ||
      //diagonal check
      (gameBoard[0][0].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][2].symbol &&
        gameBoard[2][2].symbol) ||
      (gameBoard[0][2].symbol === gameBoard[1][1].symbol &&
        gameBoard[1][1].symbol === gameBoard[2][0].symbol &&
        gameBoard[2][0].symbol)
    ) {
      someBodyWon = true;
      displayWinner(player);
    }

    console.log(someBodyWon);
  };
  const displayWinner = function (player) {
    winnerContainer.textContent = `${player} Wins!`;
  };

  let activePlayer = players.player1;
  const playRound = function (cell) {
    cell.textContent = activePlayer.symbol;
    gameBoard[cell.dataset.i][cell.dataset.j].symbol = activePlayer.symbol;
    console.log(gameBoard[cell.dataset.i][cell.dataset.j].symbol);
    checkIfSomeoneWon(activePlayer.player);
    activePlayer =
      activePlayer === players.player1 ? players.player2 : players.player1;
  };

  const createGameBoard = (function () {
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = [];
      for (let j = 0; j < 3; j++) {
        // let randomSymbol = Math.floor(Math.random() * 10) % 2 ? "X" : "O";
        // gameBoard[i].push(randomSymbol);
        gameBoard[i].push(Cell());
      }
    }
    // checkIfSomeoneWon(gameBoard);
  })();

  //events
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      playRound(cell);
    });
  });

  return { gameBoard };
})();
console.log(GameBoard);
